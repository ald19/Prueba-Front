import { gql } from '@apollo/client'

//Query para obtener el listado completo de POSTS
export const GET_ALL_POSTS = gql`
    query GetAllPosts($page: Int!) {
        posts(options: {paginate: {page: $page, limit: 5}, sort: {field: "id", order: DESC}}) {
            data {
                id
                title
                body
            }
        }
    }
`
//Query para crear un nuevo POST
export const CREATE_POST = gql`
    mutation CreatePost($title: String! $body: String!) {
        createPost(input: {title: $title, body: $body}){
            id,
            title,
            body
        }
    }
`;

//Query para actualizar un POST
export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
            id,
            title,
            body
        }
    }
`;

//Query para borrar un POST
export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`
