import { useCallback } from "react";
import { useNavigate } from "react-router";
import { moveToPage } from "../Features/Navigation";
import { useAppDispatch } from "./useStoreHooks";
import { TPages } from "../Types/Types";

export const useMyNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const push = useCallback(
    (newPage: TPages) => {
      dispatch(moveToPage(newPage));
      document.title = `Podcai | ${newPage}`;
      navigate(`/${newPage}`);
    },
    [dispatch, navigate]
  );

  const replace = useCallback(
    (to: TPages, state: any) => navigate(to, { replace: true, state }),
    [navigate]
  );

  const go = useCallback((delta: TPages) => navigate(delta), [navigate]);

  const back = useCallback(() => navigate(-1), [navigate]);

  const forward = useCallback(() => navigate(1), [navigate]);

  return {
    back,
    forward,
    go,
    push,
    replace,
  };
};
