import React, { useState, useEffect } from 'react';
import MyInput from "../input/MyInput";
import MyButton from "../button/MyButton";
import { withTranslation } from "react-i18next";
import { EditCategory } from "../../../http/userAPI";

const MyEditCategoryForm = (props) => {
    const { t, modalActive, setActive, setIsReload, id, categoryName } = props;

    const [categoryname, setCategoryName] = useState(categoryName);

    useEffect(() => {
        setCategoryName(categoryName);
    }, [modalActive]);

    const categoryNameHandler = (e) => {
        setCategoryName(e.target.value);
    }

    const EditCategoryClick = async () => {
        await EditCategory(id, categoryname);
        setActive(false);
        setIsReload(true);
    }

    return (
        <div>
            <h1 style={{ textAlign: "center", paddingBottom: "26px" }}>Edit Category</h1>

            <div>
                <h3 style={{ textAlign: "center" }}>Category Name</h3>

                <MyInput
                    style={{
                        marginBottom: "8px",
                        marginTop: "8px"
                    }}
                    onChange={e => categoryNameHandler(e)}
                    value={categoryname}
                    name="CategoryName"
                    type="text"
                    placeholder="Category Name"
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center", position: 'relative' }}>

                <MyButton
                    style={{ width: "220px", height: "60px", marginBottom: "12px" }}
                    onClick={EditCategoryClick}
                >
                    Edit
                </MyButton>
            </div>

            <div style={{ textAlign: "right" }}>
                <MyButton
                    style={{ height: "40px", outline: "none !important", border: "1px solid red", color: "red" }}
                    onClick={() => setActive(false)}
                >
                    {t('addAccount.cancel_creating')}
                </MyButton>

            </div>
        </div>
    );
};

export default withTranslation()(MyEditCategoryForm);