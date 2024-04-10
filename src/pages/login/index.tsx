import { Button, Form, Input } from "antd";
import { login } from "../../services/auth";
import { useRequest } from "ahooks";

const Login = () => {

  const { run } = useRequest((d) => login(d),{
    manual: true,
    onSuccess(data) {
      const access_token = data?.access_token;
      window.localStorage.setItem("token", access_token);
    }
  })


return <Form onFinish={run}>
  <Form.Item name="username" label="usernmae">
    <Input />
  </Form.Item>
  <Form.Item name="password" label="password">
    <Input />
  </Form.Item>
  <Button type="primary" htmlType="submit">提交</Button>
</Form>
}

export default Login;
