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
  Left,
} from "native-base";
import { getEtherscanApiContract } from '../utils/web3.js';
import { clipboardCopy } from '../utils/utils.js';


export function PclassDetails(props) {
  const { pclass } = props;
  const { data: pcdata } = pclass;

  const textareaStyles = { minWidth: props.styles.minWidth - 40, minHeight: 150 };

  const deployments = (pclass.pclassInstances || []).map(pclassi => {
    const {deployment} = pclassi.data;
    const etherscanApi = getEtherscanApiContract(deployment.chainid, deployment.address);
    return (
      <View key={pclassi._id} style={{flexDirection: "column"}}>
      <View>
        <Text
          accessibilityRole="link"
          href={etherscanApi}
          style={{color: 'blue'}}
          target="_blank"
        >
          {etherscanApi}
        </Text>
      </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button transparent small onClick={() => clipboardCopy(deployment.chainid)}>
            <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
          </Button>
          <Text style={styles.deploymentField}>Chain ID: </Text>
          <Text style={styles.deploymentValues}> {deployment.chainid}</Text>
        </View>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button transparent small onClick={() => clipboardCopy(deployment.block)}>
            <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
          </Button>
          <Text style={styles.deploymentField}>Block: </Text>
          <Text style={styles.deploymentValues}> {deployment.block}</Text>
        </View>
        <View style={{flexDirection: "column" }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Button transparent small onClick={() => clipboardCopy(deployment.address)}>
              <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
            </Button>
            <Text style={styles.deploymentField}>Address: </Text>
          </View>
          <Textarea style={{ ...textareaStyles, height: 40, minHeight: 40 }} disabled bordered value={deployment.address}/>
        </View>
        <View style={{flexDirection: "column" }}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Button transparent small onClick={() => clipboardCopy(deployment.txhash)}>
              <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
            </Button>
            <Text style={styles.deploymentField}>Transaction Hash: </Text>
          </View>
          <Textarea style={{ ...textareaStyles, height: 40, minHeight: 40 }} disabled bordered value={deployment.txhash}/>
        </View>
        {deployment.constructorArgs
          ? <View style={{flexDirection: "column" }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <Button transparent small onClick={() => clipboardCopy(deployment.constructorArgs)}>
                  <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
                </Button>
                <Text style={styles.deploymentField}>Constructor Arguments: </Text>
              </View>
              <Textarea style={{ ...textareaStyles, minHeight: 60 }} disabled bordered value={deployment.constructorArgs}/>
            </View>
          : <></>
        }
      </View>
    );
  });

  return (
    <View style={{...props.styles, flex: 1, width: props.styles.minWidth }}>
      <CardItem header>
        <H1>{pcdata.name}</H1>
      </CardItem>
      <Content>
        <Card>
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
                <Button transparent small onClick={() => clipboardCopy(JSON.stringify(pcdata.gapi))}>
                  <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
                </Button>
                <H3>
                  ABI
                </H3>
              </View>
              <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pcdata.gapi)}/>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{flexDirection: "row", alignItems: "center",}}>
                <Button transparent small onClick={() => clipboardCopy(JSON.stringify(pcdata.natspec))}>
                  <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
                </Button>
                <H3>
                  Natspec
                </H3>
              </View>
              <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pcdata.natspec)}/>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{flexDirection: "row", alignItems: "center",}}>
                <Button transparent small onClick={() => clipboardCopy(JSON.stringify(pcdata.sourceByLanguage['0'].compiler))}>
                  <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
                </Button>
                <H3>
                  Compiler
                </H3>
              </View>
              <Textarea style={textareaStyles} disabled bordered value={JSON.stringify(pcdata.sourceByLanguage['0'].compiler)}/>
            </Body>
          </CardItem>
          <CardItem>
            <Body>
              <View style={{flexDirection: "row", alignItems: "center",}}>
                <Button transparent small onClick={() => clipboardCopy(pcdata.sourceByLanguage['0'].compilerOutput.runtime.bytecode)}>
                  <Icon type="MaterialCommunityIcons" name='content-copy' style={styles.clipboardBtn} />
                </Button>
                <H3>
                  Runtime Bytecode
                </H3>
              </View>
              <Textarea style={textareaStyles} disabled bordered value={pcdata.sourceByLanguage['0'].compilerOutput.runtime.bytecode}/>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
      }}>
        <Left>
          <Button small rounded style={styles.buttonStyle} onClick={props.onInfoClosed} >
            <Icon type="MaterialCommunityIcons" name='close' />
          </Button>
        </Left>
      </View>
    </View>
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
    clipboardBtn: {
      color: '#000000',
    },
  }
)
