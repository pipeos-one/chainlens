import React from "react";
import { StyleSheet } from 'react-native';
import {
  Content,
  View,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
  Textarea,
  H1,
  H3,
  Button,
} from "native-base";


export function PclassDetails(props) {
  // TODO: show deployment on all chains
  const { pclass } = props;

  const textareaStyles = { minWidth: props.styles.minWidth - 40, minHeight: 150 };

  const deployments = pclass.pclassInstances.map(pclassi => {
    return (
      <View key={pclassi._id} style={{flexDirection: "column"}}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon type="MaterialCommunityIcons" name='content-copy' />
          <Text style={styles.deploymentField}>Chain ID: </Text>
          <Text style={styles.deploymentValues}> {pclassi.data.deployment.chainid}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon type="MaterialCommunityIcons" name='content-copy' />
          <Text style={styles.deploymentField}>Block: </Text>
          <Text style={styles.deploymentValues}> {pclassi.data.deployment.block}</Text>
        </View>
        <View style={{flexDirection: "column" }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon type="MaterialCommunityIcons" name='content-copy' />
            <Text style={styles.deploymentField}>Address: </Text>
          </View>
          <Textarea style={{ ...textareaStyles, height: 40, minHeight: 40 }} disabled bordered value={pclassi.data.deployment.address}/>
        </View>
        <View style={{flexDirection: "column" }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon type="MaterialCommunityIcons" name='content-copy' />
            <Text style={styles.deploymentField}>Transaction Hash: </Text>
          </View>
          <Textarea style={{ ...textareaStyles, height: 40, minHeight: 40 }} disabled bordered value={pclassi.data.deployment.txhash}/>
        </View>
        {pclassi.data.deployment.constructorArgs
          ? <View style={{flexDirection: "column" }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Icon type="MaterialCommunityIcons" name='content-copy' />
                <Text style={styles.deploymentField}>Constructor Arguments: </Text>
              </View>
              <Textarea style={{ ...textareaStyles, minHeight: 60 }} disabled bordered value={pclassi.data.deployment.constructorArgs}/>
            </View>
          : <></>
        }
      </View>
    );
  });

  return (
    <Content style={{...props.styles, width: '100'}}>
      <Card>
        <CardItem header>
          <Button small rounded style={styles.buttonStyle} onClick={props.onInfoClosed} >
            <Icon type="MaterialCommunityIcons" name='close' />
          </Button>
          <H1>{pclass.data.name}</H1>
        </CardItem>
        <CardItem header>
          <H3>Deployment:</H3>
        </CardItem>
        <CardItem>
          <Body>
            {deployments}
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <H3>
                ABI
              </H3>
            </View>
            <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pclass.data.gapi)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <H3>
                Natspec
              </H3>
            </View>
            <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pclass.data.natspec)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <H3>
                Compiler
              </H3>
            </View>
            <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pclass.data.sourceByLanguage['0'].compiler)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <H3>
                Runtime Bytecode
              </H3>
            </View>
            <Textarea style={textareaStyles} disabled bordered value={pclass.data.sourceByLanguage['0'].compilerOutput.runtime.bytecode}/>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}

const styles = StyleSheet.create(
  {
    deploymentField: {
      fontWeight: 600,
    },
    deploymentValues: {
      fontFamily: 'monospace',
    },
    buttonStyle: {
      backgroundColor: '#cccccc',
      marginRight: 15,
    },
  }
)
