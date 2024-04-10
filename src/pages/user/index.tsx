import { useRequest } from 'ahooks';
import { Button, Space, Table, Modal, Form, Input, message } from 'antd';
import { useRef, useState } from 'react'
import { UserID, UserInfo, fetchAllUser, fetchCreateUser, fetchDeleteUserById, } from '../../services/user';

const UserIndex = () => {

  const [open, setOpen] = useState(false)
  const [msg] = message.useMessage();
  const [form] = Form.useForm()
  const currentUser = useRef<Partial<UserInfo>>({})

  const { data = [], loading } = useRequest(fetchAllUser, {
    refreshDeps: [],
  })

  const { run: onDelete, loading: deleteLoading } = useRequest<unknown, [string]>((fetchDeleteUserById), {
    manual: true
  })

  const { run: createUser, loading: createLoading } = useRequest<unknown, [Partial<UserInfo>]>((fetchCreateUser), {
    manual: true
  })

  const columns = [
    {
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'action',
      key: 'action',
      dataIndex: '_id',
      render: (id: UserID, record: UserInfo) => {
        return <Space>
          <Button onClick={() => openEditModal(record)}>edit</Button>
          <Button onClick={() => onDelete(id)} loading={id === currentUser.current._id && deleteLoading}>delete</Button>
          <Button>{id}</Button>
        </Space>
      }
    },

  ]

  const onSubmit = () => {
    form.validateFields().then(values => {
      createUser(values)

      msg.success('created success!')
      setOpen(false);
    })

  }

  const openCreateModal = () => {
    setOpen(true);
    form.resetFields();
  }

  const openEditModal = (values: UserInfo) => {
    setOpen(true)
    currentUser.current = { ...values }
    form.setFieldsValue(currentUser.current)
  }
  return <>
    <Button onClick={openCreateModal}>Create</Button>
    <Modal open={open} onCancel={() => setOpen(false)} onOk={onSubmit}>
      <Form form={form}>
        <Form.Item name='username' label="username">
          <Input />
        </Form.Item>
        <Form.Item name='password' label="password">
          <Input />
        </Form.Item>
        <Form.Item name='aginPassword' label="aginPassword">
          <Input />
        </Form.Item>
        <Form.Item name='email' label="email">
          <Input />
        </Form.Item>
        <Button type='primary' loading={createLoading} htmlType='submit'>submit</Button>
      </Form>
    </Modal>
    <Table columns={columns} dataSource={data} loading={loading} /></>

}

export default UserIndex;