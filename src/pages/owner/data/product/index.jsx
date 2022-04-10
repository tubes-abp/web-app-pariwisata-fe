import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { 
  ExclamationCircleOutlined, 
  FolderOutlined, 
  EditOutlined, 
  DeleteOutlined  
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import OrganismsWidgetList from '../../../../components/organisms/widget/list';
import LayoutsCms from '../../../../layouts/cms';

import './style.scss'
import { delete_data, get_data } from '../../../../redux/actions/main';

const OwnerDataProduct = () => {
  const { confirm } = Modal;
  const dispatch = useDispatch();
  const history = useHistory();
  // const search = useLocation().search;
  // const name = new URLSearchParams(search).get('name');

  const [initialProducts, setInitialProducts] = useState()

  const activeMenu = {
    key: 'data-product',
    openKey: 'data',
  };
  const askToDelete = (id) => {
    confirm({
      title: 'Are you sure delete this product?',
      icon: <ExclamationCircleOutlined />,
      content: 'You can undo this change',
      onOk() {
        dispatch(delete_data(`/products`, id, 'products'));
      },
    });
  }
  const breadcrumb = [
    {
      label: 'Owner',
      url: '/owner',
    },
    {
      label: 'Data',
      url: '/owner/data/patient',
    },
    {
      label: 'Product',
      url: '/owner/data/product',
    },
  ];  
  
  // useEffect(() => {
  //   setInitialPatientList([
  //     {
  //       key: 1,
  //       name: "Tiket Masuk",
  //       price: 100000,
  //       discount: 1000,
  //       notes: "Tiket masuk buat masuk ke air terjun",
  //       type: 5,
  //       stock: 200,
  //     },
  //     {
  //       key: 2,
  //       name: "Tiket Masuk",
  //       price: 100000,
  //       discount: 1000,
  //       notes: "Tiket masuk buat masuk ke air terjun",
  //       type: 5,
  //       stock: 200,
  //     },
  //     {
  //       key: 3,
  //       name: "Tiket Masuk",
  //       price: 100000,
  //       discount: 1000,
  //       notes: "Tiket masuk buat masuk ke air terjun",
  //       type: 5,
  //       stock: 200,
  //     },
  //   ])
  // }, []);

  useEffect(() => {
    dispatch(get_data('/products', 'products'));    
  }, [dispatch]);

  const { products } = useSelector(state => state.main);
  useEffect(() => {
    // let modifyData = products.map((dt) => ({
    //   ...dt,
    // }))
    setInitialProducts(products);
  }, [products]);

  // useEffect(() => {
  //   if(!name) {
  //     dispatch(get_data('patients', 'patient_list'));
  //   }
  // }, [dispatch, name]);

  // const patientList = useSelector(state => state.admin?.patient_list)  
  // useEffect(() => {    
  //   if(patientList.length === 0 && name) {
  //     dispatch(get_data('patients', 'patient_list'));
  //   } else {
  //     let modifyData = patientList.map((dt) => ({
  //       ...dt,
  //       birthDate: format(new Date(dt.birthDate), 'dd MMMM yyyy'),
  //       gender: dt.gender === 'L'? 'Laki-Laki': 'Perempuan',
  //     }))
  //     if(name) {
  //       setInitialPatientList(modifyData?.filter((dt) => dt.name.includes(name)));
  //     } else {
  //       setInitialPatientList(modifyData);
  //     }
  //   }
  // }, [dispatch, name, patientList]);

  const handleSearch = (key) => {
    history.push(`/admin/data/patient?name=${key}`);
  }
  
  const listPatient = {
    title: "List Product",
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <Space size="middle">
              <Link to={`/owner/data/product/edit/${record.key}`}>
                <FolderOutlined />
              </Link>
              <Link to={`/owner/data/product/edit/${record.key}`}>
                <EditOutlined />
              </Link>
              <p 
                className="text-danger"
                onClick={() => askToDelete(record.key)}
              >
                <DeleteOutlined />
              </p>
            </Space>
          )
        },
      },
    ],
    data: initialProducts,
  };
  const goToAddProduct = () => {
    history.push("/owner/data/product/add")
  }
  return (
    <LayoutsCms activeMenu={activeMenu} breadcrumb={breadcrumb}>
      <div className="p-owner-data-product">
        <OrganismsWidgetList 
          list={listPatient}
          goToAddPage={() => goToAddProduct()} 
          handleSearch={handleSearch}
        />
      </div>      
    </LayoutsCms>
  )
}

export default OwnerDataProduct
