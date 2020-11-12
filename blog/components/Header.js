import React, { useState, useEffect } from 'react';
import '../static/style/components/Header.css'
import { Row, Col, Menu, Icon } from 'antd'

import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = (props) => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {

    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          setNavArray(res.data.data)
          return res.data.data
        }
      )
      setNavArray(result)
    }
    fetchData()

  }, [])

  //跳转到列表页
  const handleClick = (e) => {
    // console.log(changeType)

    if (e.key == 'home') {
      // changeType('首页')
      Router.push('/index')
    } else {
      // changeType(navArray.find(v => v.Id == e.key).typeName)
      console.log(navArray.find(v => v.Id == e.key).typeName)
      Router.push({ pathname: '/list', query: { id: e.key, type: navArray.find(v => v.Id == e.key).typeName || '' } })
    }


  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col span={8} >
          <span className="header-logo">技术胖</span>
          <span className="header-text">前端开发</span>
        </Col>
        <Col span={10} push={6}>
          <Menu mode="horizontal" onClick={(e) => handleClick(e)}>
            <Menu.Item key="home">
              <Icon type="home" />
              首页
            </Menu.Item>
            {
              navArray.map(item => {
                return (
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
            {/* <Menu.Item key="life">
              <Icon type="smile" />
              生活
            </Menu.Item> */}
          </Menu>
        </Col>
      </Row>

    </div>
  )
}
export default Header