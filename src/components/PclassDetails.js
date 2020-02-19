import React from "react";
import {
  Content,
  View,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
  Textarea,
} from "native-base";


export function PclassDetails(props) {
  // TODO: show deployment on all chains
  const { pclass } = props;
  return (
    <Content>
      <Card>
        <CardItem header>
          <Text>Name: {pclass.data.name}</Text>
        </CardItem>
        <CardItem header>
          <Text>Deployment - chain ID: </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Address:
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <Text>
                ABI:
              </Text>
            </View>
            <Textarea rowSpan={10} disabled bordered rounded value={JSON.stringify(pclass.data.gapi)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <Text>
                Natspec:
              </Text>
            </View>
            <Textarea rowSpan={10} disabled bordered rounded value={JSON.stringify(pclass.data.natspec)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <Text>
                Compiler:
              </Text>
            </View>
            <Textarea rowSpan={10} disabled bordered rounded value={JSON.stringify(pclass.data.sourceByLanguage['0'].compiler)}/>
          </Body>
        </CardItem>
        <CardItem>
          <Body>
            <View style={{flexDirection: "row", alignItems: "center",}}>
              <Icon type="MaterialCommunityIcons" name='content-copy' />
              <Text>
                Runtime Bytecode:
              </Text>
            </View>
            <Textarea rowSpan={10} disabled bordered rounded value={pclass.data.sourceByLanguage['0'].compilerOutput.runtime.bytecode}/>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
}
