import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const Spinner = () => {
    return (
        <Segment>
            <Dimmer active>
                <Loader size='huge'>Loading</Loader>
            </Dimmer>

            <div style={{height: '100px'}}></div>
        </Segment>
    )
};

export default Spinner;