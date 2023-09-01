import React from "react";
import PropTypes from "prop-types";
import {
  createStyles, TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

import AlertForError from "../Alert";

const useStyles = createStyles((theme) => ({
  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors.red[8], 0.15) : theme.colors.red[0],
  },

  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },

}));


function SignIn(props) {
  const {
    onSubmit,
    onChange,
    username,
    password,
    errors,
    logInProgress,
    formVal
  } = props;


  // return (
  //   <Flex
  //     h={"100vh"}
  //     // bg="rgba(0, 0, 0, .3)"
  //     gap="md"
  //     justify="center"
  //     align="center"
  //     direction="row"
  //     wrap="wrap"
  //   >
  //     <Paper shadow="md" p="lg" sx={{ width: "100%" }}>
  //       <form onSubmit={onSubmit} style={{ width: "100%" }}>
  //         <TextInput
  //           withAsterisk
  //           label="İstifadəçi adı"
  //           placeholder="İstifadəçi adı"
  //           autoComplete="email"
  //           id="username"
  //           name="username"
  //           autoFocus
  //           onChange={(event) =>
  //             onChange({
  //               name: event.target.name,
  //               value: event.target.value,
  //             })
  //           }
  //           value={username}
  //         />
  //         <PasswordInput
  //           placeholder="Password"
  //           label="Password"
  //           withAsterisk
  //           name="password"
  //           id="password"
  //           value={password}
  //           onChange={(event) =>
  //             onChange({
  //               name: event.target.name,
  //               value: event.target.value,
  //             })
  //           }
  //           autoComplete="current-password"
  //         />
  //         {errors.password && <AlertForError errorType={errors?.password} />}
  //         <Checkbox
  //           mt="md"
  //           label="Remember me"
  //         />

  //         <Group position="right" mt="md">
  //           <Button type="submit">Daxil ol </Button>
  //         </Group>
  //       </form>
  //       {errors?.summary && <AlertForError errorType={errors?.summary} />}
  //     </Paper>
  //   </Flex>
  // );


  function isEmptyInput(e) {
    if(e.target.value == "" || !e.target.value) {
      e.target.setCustomValidity("huhuhuhu")
    }
  }
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        AVRORA
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Giriş edin
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onSubmit}>
          <TextInput
            withAsterisk
            label="İstifadəçi adı"
            placeholder="İstifadəçi adı"
            autoComplete="email"
            id="username"
            required
            name="username"
            autoFocus
            type="text"
            onChange={(event) =>
              onChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
            value={username}
          />
          <PasswordInput
            label="Password"
            required
            placeholder="Password"
            withAsterisk
            name="password"
            id="password"
            value={password}
            onChange={(event) =>
              onChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
            autoComplete="current-password"
            />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Daxil ol
          </Button>
          {errors.summary && <AlertForError error={errors} />}
        </form>
      </Paper>
    </Container>
  );
}


SignIn.propTypes = {
  // classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.object,
  isCaptchaRequired: PropTypes.bool,
  resetCaptcha: PropTypes.bool,
  logInProgress: PropTypes.bool,
};
SignIn.defaultProps = {
  username: "",
  password: "",
  isCaptchaRequired: false,
  errors: {
    username: null,
    password: null,
    summary: null,
  },
};
export default (SignIn);
