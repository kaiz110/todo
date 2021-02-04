import React from 'react'
import {StyleSheet, View, Text, Button,SafeAreaView,Platform,ScrollView,
    Dimensions,TouchableOpacity,TextInput,FlatList} from 'react-native'
import CheckBox from '../components/CheckBox'
import {connect} from 'react-redux'
import * as actions from '../redux/actionCreator'

//let TODO_WIDTH
//onLayout={TODO_WIDTH?null:(event=>TODO_WIDTH=event.nativeEvent.layout.width)} 

class HomeScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            show: false,
            text: '',
            todoNumber: 0
        }
    }

    componentDidMount(){
        this.props.fetch()
    }

    render(){
        return <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={{fontSize: 25}}>      </Text>
                <Text style={{fontSize: 24}}> TODO </Text>

                <TouchableOpacity onPress={()=>this.setState({show: true})}>
                    <Text style={{fontSize: 18,padding: 5}}>Add</Text>
                </TouchableOpacity>  
            </View>

            {this.state.show &&
            <View style={styles.addBox}>
                <TextInput
                    style={{width: '100%',fontSize: 17}}
                    placeholder="Add a todo"
                    value={this.state.text}
                    onChangeText={text=>this.setState({text})}
                />
                <View style={styles.btn}>
                    <TouchableOpacity 
                        style={styles.btnText}
                        onPress={()=>{
                            if(this.state.text!=''){
                                this.props.addTodo(this.state.text)
                                this.props.fetch()
                            } 
                            this.setState({show: false,text: ''})
                        }}
                    >
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=>this.setState({show: false})}
                    >
                        <Text style={styles.btnText}>Cannel</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            {this.props.data &&
            <View>
                <FlatList
                    nestedScrollEnabled
                    contentContainerStyle={{paddingBottom: 50}}
                    data={this.props.data}
                    keyExtractor={list=>list.id}
                    renderItem={({item})=>{
                        return <View style={styles.todoTile}>
                            <CheckBox
                                style={{marginRight: 10}}
                                value={item.done}
                                onValueChange={()=>{
                                    this.props.isDone(item.id)
                                    this.props.check(this.props.data)
                                }}
                            />
                                <Text style={styles.contentText}>{item.content}</Text>
                        </View>
                    }}
                />
            </View>
            }
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS == 'android' ? 35 : 0
    },
    //headerbar
    headerBar: {
        height: Dimensions.get('screen').height*0.07,
        borderBottomWidth: 2,
        borderColor: '#bdbdbd',
        backgroundColor: '#03c2fc',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    //
    addBox: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 9,
        margin: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    //save and cancel
    btn: {
        flexDirection: 'row',
        marginTop: 7,
    },
    btnText: {
        paddingHorizontal: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    //list
    todoTile:{
        flexDirection: 'row',
        marginHorizontal: 7,
        padding: 7,
        borderBottomWidth: 1,
        borderColor: 'grey',
        flex: 1,
        alignItems: 'center',
    },
    contentText: {
        fontSize: 17,
        marginRight: 40,
    }
})

const mapStateToProps = (state)=>{
    return {
        data: state
    }
}

export default connect(mapStateToProps,actions)(HomeScreen)