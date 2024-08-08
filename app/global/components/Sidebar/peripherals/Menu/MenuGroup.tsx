import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  useTheme,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  ListItemIcon,
  SvgIcon,
  alpha,
} from "@mui/material";

import { Menu, MenuChildren } from "@/app/global/interfaces/menu.interface";
import MenuItem from "./MenuSingle";
import MenuSingle from "./MenuSingle";
import Iconify from "../../../Icon/iconify";

type Props = {
  item: Menu;
  level: number;
};

const MenuGroup = (props: Props) => {
  const theme = useTheme();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setOpen(false);
    setSelected(null);
    if (props.item) {
      if (props.item.children?.length) {
        checkOpenForParent(props.item.children, props.item.id);
      }
      if (props.item.path === router.pathname) {
        setSelected(props.item.id);
        setOpen(true);
      }
    }
  }, [router.pathname, props.item.children]);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? props.item.id : null);
    if (props.item?.id !== "authentication") {
      //
    }
  };

  const checkOpenForParent = (child: MenuChildren[], id: string) => {
    child.forEach((item) => {
      if (item.path === router.pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  return (
    <>
      <ListItemButton
        sx={{
          alignItems: "flex-start",
          backgroundColor: "inherit",
          py: 1.25,
          pl: `${props.level * 24}px`,
          minHeight: 44,
          marginBottom: 1,
          borderRadius: 8,
          color: theme.palette.text.secondary,
          // padding: theme.spacing(0.5, 1, 0.5, 1.5),
          ...(open && {
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
        selected={open}
        onClick={handleClick}
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
                    ? `${props.level * (props.level > 2 ? 4 : 8)}px`
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
        <SvgIcon
          inheritViewBox
          sx={{
            fontSize: "1.20rem",
            my: "auto",
            opacity: ".75",
          }}
        >
          {open ? (
            <Iconify icon="eva:chevron-up-fill" />
          ) : (
            <Iconify icon="eva:chevron-down-fill" />
          )}
        </SvgIcon>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: "relative",
            "&:before": {
              content: "''",
              position: "absolute",
              left: "32.5px",
              top: 0,
              height: "100%",
              width: "2px",
              borderRadius: "50px",
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          {props.item.children?.map((item) => {
            return (
              <>
                {item.children ? (
                  <MenuGroup item={item} level={props.level + 1} />
                ) : (
                  <MenuSingle
                    key={item.id}
                    item={item}
                    level={props.level + 1}
                  />
                )}
              </>
            );
            // <MenuSingle key={item.id} item={item} level={2} /> ;
          })}
        </List>
      </Collapse>
    </>
  );
};

export default MenuGroup;
