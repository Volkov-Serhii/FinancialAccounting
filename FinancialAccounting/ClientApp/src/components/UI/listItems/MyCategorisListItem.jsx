import React, {useEffect, useState} from 'react';
import {withTranslation} from "react-i18next";
import MyButton from '../button/MyButton';
import {DeleteCategori} from "../../../http/userAPI";
import MyEditCategoryForm from "../modalForms/MyEditCategoryForm"
import MyModal from "../modal/MyModal";


const MyCategorisListItem = ({ item, setIsReload }) => {

  const [id, setId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [modalActive, setModalActive] = useState(false)

  const Edit = (id,categoryName) =>{
    setId(id);
    setCategoryName(categoryName);
    setModalActive(true);
  }

  const Delete = async(id) =>{
    await DeleteCategori(id);
    setIsReload(true);
  }

  return (
    <div>
      <div>{item.categoryName}</div>
      {(item.userID !== null) && 
        <div>
          <MyButton
            onClick={() => Edit(item.id, item.categoryName)}>
            Edit
          </MyButton>        
          <MyButton
            onClick={() => Delete(item.id)}>
            Delete
          </MyButton>
        </div>}
        <MyModal active={modalActive} setActive={setModalActive}>
                <MyEditCategoryForm modalActive={modalActive} setActive={setModalActive} setIsReload = {setIsReload} id = {id} categoryName = {categoryName}>
                </MyEditCategoryForm>
        </MyModal>
    </div>
  );
};

export default withTranslation()(MyCategorisListItem);