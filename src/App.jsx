import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import debounce from 'lodash.debounce';

import GlobalStyle from './styles/GlobalStyle';

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 100%;

    background-color: lightgray;
    resize: none;
    font-size: 25px;
    border: none;
    padding: 20px 10px;
`;

let typingTimeout;

function App() {
    const [content, setContent] = useState('');

    const fetchData = async () => {
        const res = await axios
            .get('https://floating-badlands-29700.herokuapp.com/')
            .then((data) => data.data.data)
            .catch((error) => console.error(error));

        setContent(res);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const postData = () =>
        axios
            .post('https://floating-badlands-29700.herokuapp.com/', { value: content })
            .catch((error) => console.error(error));

    const userTyped = () => {
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(postData, 2000);
    };

    const postarBolinho = (e) => {
        const { value } = e.target;
        setContent(value);
    };

    return (
        <>
            <GlobalStyle />
            <Container>
                <Textarea name="user-text-field" value={content} onChange={postarBolinho} onKeyUp={userTyped} />
            </Container>
        </>
    );
}

export default App;
