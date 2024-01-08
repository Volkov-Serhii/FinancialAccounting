import React, { useRef, useEffect, useState } from 'react';
import { withTranslation } from "react-i18next";
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import MyButton from '../button/MyButton';
import { DeleteTransaction } from "../../../http/userAPI";
import MyModal from "../modal/MyModal";
import MyEditTransactionForm from "../modalForms/MyEditTransactionForm"


const MyList = ({ array, children }) => {

  const [isReload, setIsReload] = useState(false);

  const itemRefs = useRef([]);

  useEffect(() => {
    const maxWidth = itemRefs.current.reduce((maxWidth, itemRef) => {
      const itemWidth = itemRef.offsetWidth;
      return Math.max(maxWidth, itemWidth);
    }, 0);

    itemRefs.current.forEach((itemRef) => {
      itemRef.style.width = `${maxWidth}px`;
    });
  }, [array]);
  if (isReload) {
    window.location.reload();
  }
  array.sort((a, b) => a.id - b.id);

  return (
    <Col sm={35}>
      <ListGroup as="ul">
        {array.map((item, index) => (
          <ListGroup.Item key={index} variant="dark"
            ref={(el) => (itemRefs.current[index] = el)}>
            {React.cloneElement(children, { item: item, setIsReload: setIsReload })}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
}
export default withTranslation()(MyList);