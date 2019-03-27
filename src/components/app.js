import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React, {Component} from 'react';
import '../assets/css/app.scss';
import StudentsTable from './students_table';
import AddStudent from './add_student';
import studentData from '../dummy_data/student_list';

let id = 100;

class App extends Component{
    state = {
        students:[]
    }
    addStudent = student => {
        student.id=id++;
        this.setState({
            students:[student,...this.state.students]
        })
    }
    componentDidMount(){
        this.getStudentData();
        
    }
    getStudentData(){
        //call server here
        this.setState({
            students:studentData
        })
    }
    render(){
        return (
            <div>
                <h1 className="center">React SGT</h1>
                <div className="row">
                    <StudentsTable col="s12 m8" list={this.state.students}/>
                    <AddStudent col="s12 m4" add={this.addStudent}/>
                </div>
            </div>
        )
    }
    
};

export default App;
