import { useCallback } from "react";
import { useNavigate } from "react-router";
import { Pages } from "../ConstAndTypes/consts";
import { moveToPage } from "../Features/Navigation/Navigation";
import { useAppDispatch } from "./Hooks";

export const useMyNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const push = useCallback((newPage: Pages) => {
    dispatch(moveToPage(newPage));
    document.title = `Podcai | ${newPage}`;
    navigate(`/${newPage}`);
  }, []);

  const replace = useCallback(
    (to: Pages, state: any) => navigate(to, { replace: true, state }),
    [navigate]
  );

  const go = useCallback((delta: Pages) => navigate(delta), [navigate]);

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
