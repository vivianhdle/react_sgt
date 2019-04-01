import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React, {Component} from 'react';
import axios from 'axios';
import '../assets/css/app.scss';
import StudentsTable from './students_table';
import AddStudent from './add_student';



class App extends Component{
    state = {
        students:[]
    }
    addStudent = async student => {
        // student.id=id++;
        // this.setState({
        //     students:[student,...this.state.students],
        //     error:''
        // })
        await axios.post('/api/grades',student);
        this.getStudentData();
    }
    deleteStudent = async id => {
        // const studentsCopy = this.state.students.slice();
        // const index = studentsCopy.findIndex((student)=>{
        //     return student.id === id;
        // })
        // if (index>=0){
        //     studentsCopy.splice(index,1);
        //     this.setState({
        //         students:[...studentsCopy]
        //     })
        // }
        await axios.delete(`/api/grades/${id}`);
        this.getStudentData();
    }
    componentDidMount(){
        this.getStudentData();
        
    }
    async getStudentData(){//call server here
        // const response = axios.get('http://localhost:3001/api/grades').then( resp => {
        //     console.log('1. Server Response:', resp);
        //     this.setState({
        //         students:resp.data.data
        //     })
        // }).catch(err=>{
        //     this.setState({
        //         error: `Error retrieving student data: ${err.message}`
        //     })
        // });
        try{
            const resp = await axios.get('/api/grades');
            this.setState({
                students:resp.data.data
            })
        } catch(error){
            this.setState({
                error:`Error retrieving student data: ${error.message}`
            })
        }
        
    }
    render(){
        return (
            <div>
                <h1 className="center">React SGT</h1>
                <div className="row">
                    <h5 className="red-text text-darken-2">{this.state.error}</h5>
                    <StudentsTable col="s12 m8" list={this.state.students} delete={this.deleteStudent}/>
                    <AddStudent col="s12 m4" add={this.addStudent}/>
                </div>
            </div>
        )
    }
    
};

export default App;
