import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleClick = () => setShow(!show);
  const handleSubmit = () => {};

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password:</FormLabel>
          <InputGroup>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </VStack>
    </>
  );
};

export default Login;