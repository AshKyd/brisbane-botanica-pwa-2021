const data = require('./data.json');
const geo = require('./locations.json');
const fs = require('fs')

function go(root){
  const data = root.map(({id,title,icon,translations}) => {
    const description = translations.find(({locale, column_name}) => locale === 'en' && column_name === 'content');
    const location = geo.find(work => work.id == id);
    
    return {
      id,title, icon, description:description.value,
      location: location.location
    }
  });

  fs.writeFileSync('./sanitised.json', JSON.stringify(data,null,2));
  
}

go(data.walking[0].artworks);