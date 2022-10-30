import { useState } from 'react'
import { Button, Grid, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_POST, UPDATE_POST } from '../graphql/queries';

const PostsModal = (props: any) => {
    //Mutations
    const [addPost] = useMutation(CREATE_POST);
    const [updatePost] = useMutation(UPDATE_POST);
    //Variables
    const defaultData = {
        title: '',
        body: ''
    }
    const [form, setForm] = useState(props.item ? props.item : defaultData);

    //Método para actualizar los valores del formulario
    const handleChange = (name: any, value: any) => setForm({...form, [name]: value});

    //Método para CREAR o ACTUALIZAR un elemento (dependiendo de si se le ha pasado un POST al componente)
    async function handleSubmit(){
        //Si no se ha pasado un POST -> CREAR, sino POST -> ACTUALIZAR
        if(!props.item){
            //Lanzo la query
            const newPost = await addPost({variables: form});

            //Creo añado el nuevo elemento al principio del array para que se vea en pantalla
            const updatedArray = [newPost.data.createPost].concat([...props.results])
            props.setResults(updatedArray);
        } else{
            //Lanzo la query
            const updatedPost = await updatePost({variables: {id: props.item.id, input: {title: form.title, body: form.body}}});

            //Busco el elemento a sustituir
            const index = props.results.findIndex((item: any) => {
                if(item.id == updatedPost.data.updatePost.id)
                    return true;
            });

            //Creo el nuevo array actualizado y hago set
            const updatedArray = [...props.results].splice(1, index, updatedPost.data.updatePost)
            props.setResults(updatedArray);
        }
        
        //Se deja el formulario en blanco y se cierra el modal
        setForm(defaultData);
        closeModal();
        
    }

    //Método para cerrar el modal y settear el item seleccionado a null de nuevo
    const closeModal = () => {
        props.setSelectedItem(null);
        props.setOpenModal(false);
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Grid columns='equal'>
                {props.item ? 
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>ID</label>
                                <input value={form.id} disabled />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                : null}
                <Grid.Row>
                    <Grid.Column>
                        <Form.Field>
                            <label>Título</label>
                            <input type='text' value={form.title} onChange={event => handleChange('title', event.target.value)} />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column>
                        <Form.TextArea label="Descripción" type='text' value={form.body} onChange={event => handleChange('body', event.target.value)} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                     <Grid.Column textAlign='right'>
                        <Button color='black' onClick={() => closeModal()}>Cancelar</Button>
                        <Button color={props.item ? 'green' : 'blue'} type='submit'>{props.item ? 'Actualizar' : 'Crear'}</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Form>
    )
}

export default PostsModal;

