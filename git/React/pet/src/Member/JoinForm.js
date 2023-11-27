import { Button, Container, Form, Row, Col } from "react-bootstrap"

const JoinForm =() =>{



    return(
        <Container>
        <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" placeholder="Enter Name"/>
          </Form.Group>
  
          <Form.Group as={Col} controlId="userid">
            <Form.Label>Id</Form.Label>
            <Form.Control name="userid" placeholder="Enter Id"/>
          </Form.Group>

          <Form.Group as={Col} controlId="btn" style={{ marginTop: '6px' }}>
            <br/>
             <Button variant="primary" type="submit">
                중복확인
             </Button>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="Password" name="password" placeholder="Enter Password" />
          </Form.Group>
  
          <Form.Group as={Col} controlId="passwordcheck">
            <Form.Label>Password Check</Form.Label>
            <Form.Control type="password"  placeholder="Enter Password Check"/>
          </Form.Group>
        </Row>
  
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control placeholder="Enter Address" name="address"/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="tel">
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder="Enter Phone" name="tel" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        
  
        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
    )
}

export default JoinForm;