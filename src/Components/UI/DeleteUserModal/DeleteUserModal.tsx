import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import PasswordTextField from "../PasswordTextField/PasswordTextField";
import BasicModal from "../BasicModal/BasicModal";
import { ApiClient } from "../../../Services/axios";
import { useAppDispatch } from "../../../Hooks/Hooks";
import { isAxiosError } from "axios";
import { moveToPage } from "../../../Features/Navigation/Navigation";
import { setAuth } from "../../../Features/User/User";

export default function DeleteUserModal() {
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const apiClientInstance = ApiClient.getInstance();
  const dispatch = useAppDispatch();

  const deleteUserHandler = async () => {
    setIsLoading(true);
    try {
      const deleteRes = await apiClientInstance.deleteUser({
        password,
      });
      if (deleteRes.is_success) {
        dispatch(setAuth({ newMode: false, token: "" }));
        dispatch(moveToPage("LandingPage"));
      }
    } catch (error) {
      if (isAxiosError(error)) {
        if (typeof error.response?.data.detail === "string") {
          console.error(error.response?.data.detail);
        } else {
          console.error("General error");
        }
      } else {
        console.error("General error");
      }
    }
    setIsLoading(false);
  };

  return (
    <BasicModal
      openModalButtonText="Delete account"
      openModalButtonVariant="contained"
      openModalButtonColor="error"
      modalTitle="Delete account"
      modalDescription="Please note that the deletion is irreversible, all episodes and
                        user-related data will be permanently deleted."
    >
      <>
        <PasswordTextField
          id={"password"}
          variant={undefined}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          label="Enter password"
        />
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={deleteUserHandler}
          >
            Delete
          </LoadingButton>
          {/* <Button variant="contained">Cancel</Button> */}
        </Box>
      </>
    </BasicModal>
  );
}
