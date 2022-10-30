# Prueba técnica Frontend
---
En esta prueba, se han desarrollado los siguientes puntos:
- Crear un Proyecto React con yarn, next.js y typescript.
- Usar GraphQL-Client (Apollo) para integrar (CRUD) utilizando la API: https://graphqlzero.almansi.me/
- Comentarios en código y readme de uso del proyecto.
- UX/UI, intuitivo y corporativo.

## Requisitos
- Tener instalado npm y Node.js (en mi caso, npm 8.19.2 y Node.js 16.17.0)
- Tener instalado yarn (en mi caso, 1.22.19)

## Tecnologías
Para este proyecto, se han utilizado las siguientes tecnologías:
- [Next.js](https://nextjs.org/docs)
- [GraphQL](https://graphql.org/graphql-js/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Semantic UI React](https://react.semantic-ui.com/)

## Desarrollo
El desarrollo de la prueba se ha relizado siguiendo los pasos:
1. Instalar dependencias a través de los comandos proporcionados indicados en la documentación de cada tecnología.
2. Integrar **Apollo Client** y **Semantic UI React** en el archivo '_app.tsx'.
3. Creación de la carpeta '/graphql' junto con el archivo 'queries.ts'.
4. Implementación de las querys en el archivo 'queries.ts. 
5. Creación de la carpeta '/components' junto con el archivo 'posts.tsx'.
6. En el archivo 'posts.tsx', se crea un componente **Posts** en el cual:
    - Utilizando los métodos de **Apollo Client**, se realiza la petición para obtener el listado de posts. 
    - Una vez obtengo los datos, se muestran en una tabla utilizando los componentes proporcionados por **Semantic UI React** para que sea responsive.
7. Una vez obtenido el listado de posts, las funcionalidades de crear y editar se realizarán a través de un formulario mostrado en un modal. Para ello, se crea dentro de la carpeta '/components' un archivo 'posts-modal.tsx'. Este, será un nuevo componente **PostsModal**. En dicho componente:
    - Utilizando los métodos de **Apollo Client**, se realiza las peticiones necesarias para crear o editar un post.
    - Para ello, desde el componente **Posts**, se le pasa por props a este componente la información necesaria que le indicará si crear o editar un post.
    - Estas funcionalidades se realizarán a través de un formulario mostrado en un Modal utilizando de nuevo los componentes que nos proporciona **Semantic UI React**.
8. Por último, la funcionalidad de borrar un post se realiza desde el componente **Posts** utilizando un Confirm para confirmar la eliminación del post.

## Arrancar proyecto
Para poder arrancar el proyecto, primero hay que instalar las dependencias. Para ello, nos situamos en la raiz del proyecto y ejecutamos:
```bash
npm install
# o
yarn install
```
Hecho esto, se autogenerará el node_modules (que contendrá las dependencias del package.json) y el package-lock.json.
Una vez instaladas las dependencias, para iniciar el proyecto ejecutamos:
```bash
npm run dev
# o
yarn dev
```
Finalmente, abrimos en el navegador [http://localhost:3000](http://localhost:3000) para visualizar el proyecto.