import { useQuery, useMutation } from '@apollo/client'
import { DELETE_POST, GET_ALL_POSTS } from '../graphql/queries';
import { Icon, Button, Menu, Table, Confirm } from 'semantic-ui-react'
import { useState, useEffect } from 'react';
import Spinner from './spinner';

const Posts = (props: any) => {
    //Variable de paginación
    const [page, setPage] = useState(1);
    //Query para obtener todos los POSTS
    const {loading, error, data} = useQuery(GET_ALL_POSTS, {variables: {page}});
    const [deletePost] = useMutation(DELETE_POST);
    //Variables
    const [confirm, setConfirm] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if(data)
            props.setResults(data.posts.data);
    }, [data])
    
    /**
     * Si la petición no ha finalizado, se muestra un Spinner
     * En caso de error, se muestra en pantalla
     */
    if (loading) return <Spinner />;
    if (error) return <p style={{color: 'white'}}>Error :(</p>;

    //Método para borrar un POST
    /**
     * Se lanza la query
     * Si se ha realizado correctamente, busco el índice del POST a eliminar, actualizo el array y luego hago set
     * Creo el nuevo array actualizado, hago set y cierro el Confirm
    */
    async function removePost(post: any){
        const resp = await deletePost({variables: {id: post.id}});
        
        if(resp && resp.data.deletePost){
            const index = props.results.findIndex((item: any) => {
                if(post.id == item.id)
                    return true;
            });

            const updatedArray = [...props.results];
            updatedArray.splice(index , 1);
            props.setResults(updatedArray);
        }
        setConfirm(false);
    }

    //Método para abrir el modal
    const openModal = (item: any) => {
        props.setSelectedItem(item);
        props.setOpenModal(true);
    }

    return(
        <>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Título</Table.HeaderCell>
                        <Table.HeaderCell>Descripción</Table.HeaderCell>
                        <Table.HeaderCell>Acciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.results.length ? 
                        props.results.map((item:any, index: number) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.title}</Table.Cell>
                                <Table.Cell>{item.body}</Table.Cell>
                                <Table.Cell>
                                    <div style={{display: 'flex'}}>
                                        <Button color='green' onClick={() => openModal(item)}>Editar</Button>
                                        <Button color='red' onClick={() => {setConfirm(true), setSelected(item)}}>Borrar</Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                    ))
                    : null}
                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                        <Menu floated="right" pagination>
                            <Menu.Item as='a' icon onClick={() => setPage(page - 1)}>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            <Menu.Item as='a'>{page}</Menu.Item>
                            <Menu.Item as='a' icon onClick={() => setPage(page + 1)}>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            
            <Confirm
                open={confirm}
                content='¿Estás seguro?'
                confirmButton='Confirmar'
                cancelButton='Cancelar'
                onCancel={() => setConfirm(false)}
                onConfirm={() => removePost(selected)}
            />
        </>
    )
}

export default Posts;