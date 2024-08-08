import { Menu } from "@/app/global/interfaces/menu.interface";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  item: Menu;
  level: number;
};

const MenuSingle = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const go = (path: string) => {
    if (props.item.path === router.pathname) {
      return false;
    } else {
      return router.push(path);
    }
  };

  return (
    <ListItemButton
      sx={{
        alignItems: "center",
        backgroundColor: "inherit",
        py: props.level > 1 ? 1 : 1.25,
        pl: `${props.level * 24}px`,
        minHeight: 44,
        marginBottom: props.level > 1 ? 0 : 1,
        borderRadius: 8,
        color: theme.palette.text.secondary,
        // padding: theme.spacing(0.5, 1, 0.5, 1.5),
        ...(props.item.path === router.pathname && {
          color:
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : theme.palette.primary.light,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          "&:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
      selected={props.item.path === router.pathname}
      onClick={() => go(props.item.path)}
      title={props.item.title}
    >
      {props.item.icon && (
        <ListItemIcon
          sx={{
            width: 24,
            height: 24,
            flexShrink: 0,
            marginRight: theme.spacing(2),
          }}
        >
          <props.item.icon />
        </ListItemIcon>
      )}

      <ListItemText
        primary={
          <Typography
            variant="subtitle2"
            color="inherit"
            sx={{
              width: "100%",
              maxWidth: "100%",
              display: "block",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              paddingLeft:
                props.level > 1
                  ? `${props.level * props.level > 2 ? 4 : 8}px`
                  : 0,
              fontWeight:
                theme.typography[
                  props.item.path === router.pathname
                    ? "fontWeightSemiBold"
                    : "fontWeightMedium"
                ],
              ...theme.typography.body2,
            }}
          >
            {props.item.title}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default MenuSingle;
