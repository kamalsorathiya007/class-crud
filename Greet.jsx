
// import { computeHeadingLevel } from '@testing-library/react';
// import { computeHeadingLevel } from '@testing-library/react';
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Container, Row, Col, Form, FormGroup, Label, Input, Table, ModalFooter } from 'reactstrap';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      allProfiles: [],
      profile: {
        id: Date.now(),
        FirstName: "",
        LastName: "",
        UserName: "",
        Email: "",
        Gender: "",
        Password: "",
        Hobbies: [],
        ConfirmPassword: "",
        editId: null,

      }
    };


    // this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal) this.reset()
  }

  onInputChange = (event) => {
    this.setState({
      profile: {
        ...this.state.profile,
        [event.target.name]: event.target.value,
      }
    })

  }
  onHandleSubmit = (e) => {
    e.preventDefault();
    this.toggle()
    // edit event condition 
    if (this.state.userid !== null) {
      this.setState({
        allProfiles: this.state.allProfiles.filter(elm => elm.id !== this.state.editId)
      }, () => {
        this.setState({
          profile: { ...this.state.profile, id: this.state.editId },
          allProfiles: [...this.state.allProfiles, this.state.profile]
        }, () => {
          this.setStorage()
          this.setState({
            editId: null
          }, () => {
            // this.toggle()
          })
        })
      })

    } else {
      this.setState({
        allProfiles: [...this.state.allProfiles, this.state.profile]
      }, () => {
        this.setStorage()
      })
      this.reset()
      this.toggle()
    }
  }
  CheckBoxChanged = (e) => {
    if (e.target.checked) {
      this.setState({
        profile: {
          ...this.state.profile, Hobbies: [...this.state.profile.Hobbies, e.target.value]
        }
      })
    } else {
      this.setState({
        profile: {
          ...this.state.profile,
          Hobbies: this.state.profile.Hobbies.filter((elm) => elm !== e.target.value),
        }
      });
    }

    }
    setStorage = () => {
      localStorage.setItem("allProfiles", JSON.stringify(this.state.allProfiles));
    }
    getStorage = () => {
      if (localStorage.getItem("allProfiles")) {
        this.setState({
          ...this.state.allProfiles,
          allProfiles: JSON.parse(localStorage.getItem("allProfiles"))
        })
      }
    }
    componentDidMount(){
      this.getStorage()
    }
    reset = () => {
      this.setState({
        profile: {
          id: Date.now(),
          FirstName: "",
          LastName: "",
          UserName: "",
          Email: "",
          Gender: "",
          Password: "",
          Hobbies: [],
        }
      })
    }
    onEdit = (id) => {

      this.toggle()
      this.setState({
        editId: id,
        profile: this.state.allProfiles.filter((elm) => elm.id === id)[0]
      })
    }
    DeleteRow = (id) => {
      window.confirm("are You Sure You Want to Delete?")

      this.setState({
        ...this.state.allProfiles,
        allProfiles: this.state.allProfiles.filter(element => element.id !== id)
      }, () => {
        this.setStorage()
      })
    }


  render() {
    console.log(this.state.allProfiles);

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>CLASS-CRUD</h1>
            </Col>
            <Col>
              <Button color="dark" onClick={this.toggle}>Click Me</Button>
            </Col>    
          </Row>
          <Table striped >
            <thead >
              <tr className='table-info'>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>E-Mail</th>
                <th>Gender</th>
                <th>Hobbies</th>
                <th>Password</th>
                <th>ConfirmPassword</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody className='table-warning'>{
              this.state.allProfiles?.map((z, index) => {
                return (
                  <tr key={index}>
                    <td>{z.id}</td>
                    <td>{z.FirstName}</td>
                    <td>{z.LastName}</td>
                    <td>{z.UserName}</td>
                    <td>{z.Email}</td>
                    <td>{z.Gender}</td>
                    <td>{z.Hobbies.join(",")}</td>
                    <td>{z.Password}</td>
                    <td>{z.ConfirmPassword}</td>
                    <td>
                      <Button id='edit' color='success' onClick={() => this.onEdit(z.id)} > Edit</Button> <Button id='Delete' color='danger' onClick={() => this.DeleteRow(z.id)}> Delete</Button>
                    </td>
                  </tr>
                )
              })
            }


            </tbody>
          </Table>

        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} className="bg-success">Form</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={this.onHandleSubmit} >
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
                <Label for="exampleFirstName" className="mr-sm-2">FirstName</Label>
                <Input type="text" name="FirstName" id="exampleFirstName" placeholder="James" onChange={this.onInputChange} value={this.state.profile.FirstName} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0" >
                <Label for="exampleLastName" className="mr-sm-2">LastName</Label>
                <Input type="text" name="LastName" id="exampleLastName" placeholder="Bond" onChange={this.onInputChange} value={this.state.profile.LastName} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleEmail" className="mr-sm-2">E-Mail</Label>
                <Input type="email" name="Email" id="exampleEmail" placeholder="abc@gmail.com" onChange={this.onInputChange} value={this.state.profile.Email} />
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="exampleUserName" className="mr-sm-2">UserName</Label>
                <Input type="text" name="UserName" id="exampleUserName" placeholder="james123" onChange={this.onInputChange} value={this.state.profile.UserName} />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="Password" id="examplePassword" placeholder="Enter Password" onChange={this.onInputChange} value={this.state.profile.Password} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleConfirmPassword">ConfirmPassword</Label>
                <Input type="password" name="ConfirmPassword" id="exampleConfirmPassword" placeholder="ConfirmPassword" onChange={this.onInputChange} value={this.state.profile.ConfirmPassword} />
              </FormGroup>
              <div>
                <label htmlFor="">Gender:</label>
              </div>
              <FormGroup check inline>
                <Label check >
                  <Input type="radio"
                   name='Gender' value={"Male"} 
                   onChange={this.onInputChange} 
                   checked={this.state.profile.Gender.includes("Male")} />{' '}
                  Male
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name='Gender' value={"Female"} onChange={this.onInputChange} checked={this.state.profile.Gender.includes("Female")} />{' '}
                  Female
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="radio" name='Gender' value={"Other"} onChange={this.onInputChange} checked={this.state.profile.Gender.includes("Other")} />{' '}
                  Other
                </Label>
              </FormGroup>


              <div>
                <span>Hobbies:</span>
              </div>
              <FormGroup check inline>

                <Label check>
                  <Input type="checkbox" name='Hobbies' onChange={this.CheckBoxChanged} value="Cricket" checked={this.state.profile.Hobbies.includes("Cricket")} /> Cricket
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name='Hobbies' onChange={this.CheckBoxChanged} value="E-Sports" checked={this.state.profile.Hobbies.includes("E-Sports")} /> E-Sports
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name='Hobbies' onChange={this.CheckBoxChanged} value="Coding" checked={this.state.profile.Hobbies.includes("Coding")} /> Coding
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input type="checkbox" name='Hobbies' onChange={this.CheckBoxChanged} value="Writing" checked={this.state.profile.Hobbies.includes("Writing")} /> Writing
                </Label>
              </FormGroup>

              <ModalFooter>
                <Button color="primary" Input type='submit'>Save</Button>{' '}

              </ModalFooter>

            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;