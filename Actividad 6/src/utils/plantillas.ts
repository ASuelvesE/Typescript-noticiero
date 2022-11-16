import Noticia from "../models/Noticia";

export function montaHtmlNoticias(noticias: any[]){

    const plantilla = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>${noticias[0].titulo}</h1>
    <img src="${noticias[0].url}" alt="">
    <p>${noticias[0].texto}</p>
</body>
</html>
`
return plantilla;
}