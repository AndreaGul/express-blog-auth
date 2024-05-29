
let posts = require('../db/posts.json');
const { generateSlug, updatePosts ,eliminaFile } = require('../utils');


const index = (req, res) => {
    
    res.format({
      html: () => {
        let html = '<main><ul>';
        posts.forEach(({ titolo, contenuto, immagine, tags, slug }) => {
          html += `
          <li>titolo: ${titolo}</li>
          <li>${contenuto}</li>
          <li><img width="200px" src="/${immagine}"/></li>
          <li>tags: ${tags}</li>
          <li>tags: ${tags}</li>
          <li><a href="/posts/${ slug }" > Visualizza post </a></li><br></br>`;
          
        });
        html += '</ul><main>';
        res.send(html);
      },
      json: () => {
        res.json(posts);
      },
    });
  }

const show =(req,res)=>{
  const slugPostsRichiesto = req.params.slug;
  const postRichiesto= posts.find( post => post.slug === slugPostsRichiesto);
  
  res.format({ 
    html: () => {
      const { titolo, contenuto, immagine, tags, slug } = postRichiesto;
      let html = '<main><ul>';
      html += `
        <li>titolo: ${titolo}</li>
        <li>${contenuto}</li>
        <li><img width="200px" src="/${immagine}"/></li>
        <li>tags: ${tags}</li>
        <li><a href="/${immagine}" target="_blank"> Visualizza immagine</a> </li>`;
        
      html += '</ul><main>';
      res.send(html);
    },
    json:()=>{
    if(postRichiesto){
      res.json({
        ...postRichiesto,
        
      });
    }else{
      res.status(404).json({
        error: 'Not Found',
        description: `Non esiste un post con slug ${slugPostsRichiesto}`
      })
    }
  }})
 
}


const store = (req,res)=>{
  const{titolo,contenuto,tags}=req.body
  res.format({
    html:()=>{
      if(!titolo || !contenuto || !tags){
        // se pur si sia presentata questa condizione il file inserito e' comunque stato salvata quindi c'e' bisogno di eliminarlo
         req.file?.filename && eliminaFile(req.file.filename);
        return res.status(400).send('Alcuni dati mancano');
      }else if(!req.file || !req.file.mimetype.includes('image')){
         // se pur si sia presentata questa condizione il file inserito e' comunque stato salvata quindi c'e' bisogno di eliminarlo
         req.file?.filename && eliminaFile(req.file.filename);
        return res.status(400).send('immagine mancante o il file non e\' un immagine');
      }
      slug = generateSlug(titolo);
      const nuovoPost={
        titolo,
        slug,
        contenuto,
        immagine: req.file.filename,
        tags,
      }
       posts = updatePosts([...posts, nuovoPost ]);
      
      res.status(200).redirect('/posts')
    },
    default:()=>{
      
      res.json(`titolo:${titolo},contenuto:${contenuto},tags:[${tags}]`)
    }
  })

}




module.exports ={
  index,
  show,
  store
}