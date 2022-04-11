import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Space, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { 
  ExclamationCircleOutlined,
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
  const search = useLocation().search;
  const keyQuery = new URLSearchParams(search).get('key');

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

  useEffect(() => {
    dispatch(get_data('/products', 'products'));    
  }, [dispatch]);

  const { products } = useSelector(state => state.main);
  useEffect(() => {
    if(products.length === 0 && keyQuery) {
      dispatch(get_data('/products', 'products'));
    } else {
      let modifyData = products.map((dt) => ({
        ...dt,
        price: "Rp"+new Intl.NumberFormat().format(dt['price'])
      }))
      if(keyQuery) {
        setInitialProducts(modifyData.filter(
          (dt) => dt.name.toLowerCase().includes(keyQuery.toLowerCase())
        ));
      } else {
        setInitialProducts(modifyData);
      }
    }
  }, [dispatch, products, keyQuery]);  

  const handleSearch = (key) => {
    history.push(`/owner/data/product?key=${key}`);
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
