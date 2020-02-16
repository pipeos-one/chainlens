import React from 'react';
import './App.css';
import { Container, Content } from 'native-base';
import ListExample from './components/ListExample.js';
import fetch from 'unfetch';
import useSWR from 'swr';
import {pclassWithPfuncApi} from './utils.js';

async function fetcher(apiUrl) {
  const res = await fetch(apiUrl);
  return await res.json();
}

function App() {
  const filter = {limit: 5, skip: 0};
  const { data, error } = useSWR(pclassWithPfuncApi(filter), fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('data', data)
  return (
        <Content>
          <ListExample data={data}/>
        </Content>
      <Container style={styles.container}>
      </Container>
  );
}

export default App;

const styles = StyleSheet.create(
  {
    container: {
      width: '100%',
      height: '100%',
    },
  }
)
