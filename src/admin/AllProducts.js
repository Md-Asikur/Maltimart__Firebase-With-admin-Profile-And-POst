import { async } from '@firebase/util';
import { deleteDoc,doc } from 'firebase/firestore';
import React from 'react'
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap'
import UserGetData from '../custom-hooks/UserGetData';
import { db } from '../firebase.config';

const AllProducts = () => {
  const { data: productsData } = UserGetData("products")
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id))
    toast.success("Product Deleted Successfully!")
 }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  productsData.map((item) => 
                     <tr key={item.id}>
                       <td><img src={item.imgUrl} alt=""/></td>
                       <td>{item.title}</td>
                       <td>{item.category}</td>
                       <td>{item.price}</td>
                       <td>
                         <button onClick={()=>deleteProduct(item.id)} type="submit" className="btn btn-danger">
                           Delete
                         </button>
                       </td>
                     </tr>
                  )
               }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AllProducts