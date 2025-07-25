import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import { ApiClient } from "../../Api/axios";
import { useAppDispatch } from "../../Hooks/useStoreHooks";
import { isAxiosError } from "axios";
import { setAuth } from "../../Features/User";
import { useMyNavigation } from "../../Hooks/useMyNavigation";
import BasicModal from "./BasicModal";
import { PasswordTextField } from "./PasswordTextField";
import { useState } from "react";

export default function DeleteUserModal() {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const apiClientInstance = ApiClient.getInstance();
  const dispatch = useAppDispatch();
  const nav = useMyNavigation();

  const deleteUserHandler = async () => {
    setIsLoading(true);
    try {
      const deleteRes = await apiClientInstance.deleteUser({
        password,
      });
      if (deleteRes.is_success) {
        dispatch(setAuth({ newMode: false, token: "" }));
        nav.push("LandingPage");
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
      modalTitle="Delete your account"
      modalDescription="Please note that the deletion is irreversible. All episodes and
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
          size="small"
        />
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <LoadingButton
            loading={isLoading}
            variant="contained"
            color="error"
            onClick={deleteUserHandler}
            fullWidth
          >
            Delete
          </LoadingButton>
        </Box>
      </>
    </BasicModal>
  );
}
