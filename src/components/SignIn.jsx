import React from "react";
import PropTypes from "prop-types";
import { TextInput, Checkbox, Button, Group, Paper, PasswordInput, Center, createStyles, Flex, Text, Transition } from '@mantine/core';
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import AlertForError from "./Alert";
import { isEmpty } from "../utils";
import { useTimeout } from '@mantine/hooks';

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
  } = props;



  // return (
  //   <Fragment>
  //     <CssBaseline />
  //     <MainLayout>
  //       <StyledPaper>
  //         <img src={logo} />
  //         {errors.summary && (
  //           <FormHelperText error={true} id="component-helper-text">
  //             {errors.summary}
  //           </FormHelperText>
  //         )}
  //         {logInProgress && <CircularProgress size={15} color="secondary" />}
  //         <StyledForm>
  //           <FormControl margin="normal" required fullWidth>
  //             <InputLabel htmlFor="username">İstifadəçi adı</InputLabel>
  //             <Input
  //               id="username"
  //               name="username"
  //               autoComplete="email"
  //               autoFocus
  //               onChange={(event) =>
  //                 onChange({
  //                   name: event.target.name,
  //                   value: event.target.value,
  //                 })
  //               }
  //               value={username}
  //             />
  //             {errors.username && (
  //               <FormHelperText error={true} id="component-helper-text">
  //                 {errors.username}
  //               </FormHelperText>
  //             )}
  //           </FormControl>
  //           <FormControl margin="normal" required fullWidth>
  //             <InputLabel htmlFor="password">Parol</InputLabel>
  //             <Input
  //               name="password"
  //               type="password"
  //               id="password"
  //               value={password}
  //               onChange={(event) =>
  //                 onChange({
  //                   name: event.target.name,
  //                   value: event.target.value,
  //                 })
  //               }
  //               autoComplete="current-password"
  //             />
  //             {errors.password && (
  //               <FormHelperText error={true} id="component-helper-text">
  //                 {errors.password}
  //               </FormHelperText>
  //             )}
  //           </FormControl>
  //           {(
  //             <FormControlLabel
  //               control={<Checkbox value="remember" color="primary" />}
  //               label="Remember me"
  //             />
  //           )}
  //           <ButtonSubmit
  //             onClick={onSubmit}
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             color="primary"
  //             disabled={logInProgress}
  //           >
  //             Daxil ol
  //           </ButtonSubmit>
  //         </StyledForm>
  //       </StyledPaper>
  //     </MainLayout>
  //   </Fragment>
  // );
  return (
    <Flex
      h={"100vh"}
      // bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Paper shadow="md" p="lg" sx={{ width: "100%" }}>
        <form onSubmit={onSubmit} style={{ width: "100%" }}>
          <TextInput
            withAsterisk
            label="İstifadəçi adı"
            placeholder="İstifadəçi adı"
            autoComplete="email"
            id="username"
            name="username"
            autoFocus
            onChange={(event) =>
              onChange({
                name: event.target.name,
                value: event.target.value,
              })
            }
            value={username}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
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
          {errors.password && <AlertForError errorType={errors?.password} />}
          <Checkbox
            mt="md"
            label="Remember me"
          />

          <Group position="right" mt="md">
            <Button type="submit">Daxil ol </Button>
          </Group>
        </form>
        {errors?.summary && <AlertForError errorType={errors?.summary} />}
      </Paper>
    </Flex>
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
