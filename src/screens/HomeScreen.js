import React from 'react'
import {StyleSheet, View, Text, Button,
    Dimensions,TouchableOpacity,TextInput,FlatList} from 'react-native'
import {connect} from 'react-redux'
import * as actions from '../redux/actionCreator'

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            text: '',
        }
    }
    

    render(){
        return <View>
            <View style={styles.headerBar}>
                <Text> </Text>
                <Text style={{fontSize: 22}}>ToDo</Text>

                <TouchableOpacity onPress={()=>this.setState({show: true})}>
                    <Text style={{fontSize: 18}}>Add</Text>
                </TouchableOpacity>  
            </View>

            {this.state.show &&
            <View style={styles.addBox}>
                <TextInput
                    style={{width: '100%'}}
                    placeholder="Add a to do"
                    value={this.state.text}
                    onChangeText={text=>this.setState({text})}
                />
                <View style={styles.btn}>
                    <TouchableOpacity 
                        style={styles.btnText}
                        onPress={()=>this.props.addTodo(this.state.text)}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btnText}
                        onPress={()=>console.log(this.props.data)}
                    >
                        <Text>Cannel</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            {this.props.data &&
            <View>
                <FlatList
                    data={this.props.data}
                    keyExtractor={list=>list.id}
                    renderItem={({item})=>{
                        return <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                                onPress={()=>{
                                    this.props.isDone(item.id)
                                    this.props.check()
                                }}
                            >
                                <Text>{item.content}</Text>
                            </TouchableOpacity>
                            
                            <Text>  {String(item.done)}</Text>
                        </View>
                    }}
                />
            </View>
            }
        </View>
    }
}

const styles = StyleSheet.create({
    headerBar: {
        height: Dimensions.get('screen').height/10,
        borderBottomWidth: 2,
        borderColor: '#bdbdbd',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    addBox: {
        borderWidth: 1,
        padding: 7,
        margin: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    btn: {
        flexDirection: 'row',
    },
    btnText: {
        paddingHorizontal: 7
    }
})

const mapStateToProps = (state)=>{
    return {
        data: state
    }
}

export default connect(mapStateToProps,actions)(HomeScreen)