import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Fade,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import {
  bytesConverter,
  bytesConstant,
  ImgTo64,
} from "../../helper/converter.helper";
import {
  UseFormSetValue,
  UseFormReset,
  UseFormWatch,
  useForm,
} from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import Iconify from "../Icon/iconify";
import { getDeviceType } from "../../hooks/useDevice";
import { CalculateAspectRatio, CompressImage } from "../../hooks/useFile";

const HiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

type Props = {
  show: boolean;
  name: string;
  setValue: UseFormSetValue<any>;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
};

const UploadForm = (props: Props) => {
  const theme = useTheme();
  const buttonCameraRef = useRef<HTMLInputElement>(null);

  const [SelectedFile, setSelectedFile] = useState<Blob | null>();
  const [PreviewLink, setPreviewLink] = useState("");
  const [TooBig, setTooBig] = useState(false);
  const [WrongFormat, setWrongFormat] = useState(false);
  const [WrongAspectRatio, setWrongAspectRatio] = useState(false);

  const [SelectedPreview, setSelectedPreview] = useState<{
    name: string;
    link: string;
  } | null>(null);

  const { watch } = useForm<{ img: string }>();

  useEffect(() => {
    if (typeof props.watch()?.[props.name] === "object") {
      if (getDeviceType() === "Mobile") {
        if (props.watch()?.[props.name]?.size < 2000000) {
          setTooBig(false);
          setSelectedFile(props.watch()?.[props.name]);

          props.setValue(props.name, props.watch()?.[props.name]);

          const url = URL.createObjectURL(props.watch()?.[props.name]);
          if (url) {
            setPreviewLink(url);
            props.setValue(`${props.name}_url`, url);
          }
        } else {
          CompressImage(props.watch()?.[props.name], 2).then((result) => {
            CalculateAspectRatio(props.watch()?.[props.name]);

            setTooBig(false);
            setSelectedFile(result);

            props.setValue(props.name, result);

            const url = URL.createObjectURL(result);
            if (url) {
              setPreviewLink(url);
              props.setValue(`${props.name}_url`, url);
            }
          });
        }
      } else {
        if (props.watch()?.[props.name]?.size < 2000000) {
          setTooBig(false);
          setSelectedFile(props.watch()?.[props.name]);

          props.setValue(props.name, props.watch()?.[props.name]);

          const url = URL.createObjectURL(props.watch()?.[props.name]);
          if (url) {
            setPreviewLink(url);
            props.setValue(`${props.name}_url`, url);
          }
        } else {
          setTooBig(true);
        }
      }
    }
  }, [props.watch]);

  const handleSetSelectedFile = async (e: any) => {
    const CorrectFormat = () => {
      if (e.target.files?.length > 0) {
        if (e?.target?.files[0]?.type.includes("jpg")) {
          return true;
        } else if (e?.target?.files[0]?.type.includes("png")) {
          return true;
        } else if (e?.target?.files[0]?.type.includes("jpeg")) {
          return true;
        } else {
          return false;
        }
      }
    };

    if (e.target.files.length > 0) {
      if (CorrectFormat() === true) {
        setWrongFormat(false);

        const AspectRatio = await CalculateAspectRatio(e?.target?.files[0]);

        if (typeof AspectRatio === "number" && AspectRatio < 1) {
          setWrongAspectRatio(true);
        } else {
          setWrongAspectRatio(false);

          if (getDeviceType() === "Mobile") {
            if (e?.target?.files[0]?.size < 2000000) {
              setTooBig(false);
              setSelectedFile(e?.target?.files[0]);

              props.setValue(props.name, e?.target?.files[0]);

              const url = URL.createObjectURL(e?.target?.files[0]);
              if (url) {
                setPreviewLink(url);
                props.setValue(`${props.name}_url`, url);
              }
            } else {
              CompressImage(e?.target?.files[0], 2).then((result) => {
                CalculateAspectRatio(e?.target?.files[0]);

                setTooBig(false);
                setSelectedFile(result);

                props.setValue(props.name, result);

                const url = URL.createObjectURL(result);
                if (url) {
                  setPreviewLink(url);
                  props.setValue(`${props.name}_url`, url);
                }
              });
            }
          } else {
            if (e?.target?.files[0]?.size < 2000000) {
              setTooBig(false);
              setSelectedFile(e?.target?.files[0]);

              props.setValue(props.name, e?.target?.files[0]);

              const url = URL.createObjectURL(e?.target?.files[0]);
              if (url) {
                setPreviewLink(url);
                props.setValue(`${props.name}_url`, url);
              }
            } else {
              setTooBig(true);
            }
          }
        }
      } else {
        setWrongFormat(true);
      }
    }
  };

  const handleDeleteFile = () => {
    props.reset({
      [props.name]: "",
    });

    setWrongFormat(false);
    setTooBig(false);
    setSelectedFile(null);
    setPreviewLink("");
  };

  const handleClose = () => {
    return setTimeout(() => {
      handleDeleteFile();
    }, 10);
  };

  return (
    <Box>
      {TooBig === true && (
        <Fade
          in={TooBig ? TooBig : WrongFormat ? WrongFormat : false}
          timeout={350}
        >
          <Alert
            variant="outlined"
            severity="error"
            sx={{
              marginBottom: theme.spacing(2),
              display: "flex",
              alignContent: "center",
            }}
          >
            <Typography variant="body2">
              Ukuran file terlalu besar.
              <br />
              Pastikan file berukuran maksimal <b>2 MB.</b>
            </Typography>
          </Alert>
        </Fade>
      )}
      {WrongFormat === true && (
        <>
          <Fade in={WrongFormat ? WrongFormat : false} timeout={350}>
            <Alert
              variant="outlined"
              severity="error"
              sx={{
                marginBottom: theme.spacing(2),
                display: "flex",
                alignContent: "center",
              }}
            >
              <Typography variant="body2">
                Sepertinya kamu memilih file yang salah. <br />
                <b>Pastikan file bertipe : *.jpeg, *.jpg, *.png.</b>
              </Typography>
            </Alert>
          </Fade>
        </>
      )}
      {WrongAspectRatio === true && (
        <>
          <Fade in={WrongAspectRatio ? WrongAspectRatio : false} timeout={350}>
            <Alert
              variant="outlined"
              severity="error"
              sx={{
                marginBottom: theme.spacing(2),
                display: "flex",
                alignContent: "center",
              }}
            >
              <Typography variant="body2">
                Gambar ini terdeteksi <i>Potrait</i>.
                <br />
                Pastikan gambar berorientasi{" "}
                <b>
                  <i>Landscape</i>.
                </b>
              </Typography>
            </Alert>
          </Fade>
        </>
      )}
      {PreviewLink === null ||
      PreviewLink === undefined ||
      PreviewLink === "" ? (
        <Stack direction="column" gap={2}>
          {getDeviceType() === "Mobile" && (
            <>
              <Stack gap={0.5}>
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  startIcon={<Iconify icon="eva:camera-outline" />}
                  onClick={() =>
                    buttonCameraRef.current !== null &&
                    buttonCameraRef.current.click()
                  }
                >
                  Ambil gambar
                  <HiddenInput
                    ref={buttonCameraRef}
                    type="file"
                    accept="image/*"
                    capture="user"
                    onChange={(e) => {
                      handleSetSelectedFile(e);
                    }}
                  />
                </Button>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  textAlign="center"
                  fontSize="70%"
                >
                  Harap ambil gambar dengan orientasi <i>landscape</i>.
                </Typography>
              </Stack>
              <Divider
                textAlign="center"
                flexItem
                sx={{ alignItems: "center" }}
              >
                <Typography variant="caption" color="text.secondary">
                  atau
                </Typography>
              </Divider>
            </>
          )}
          <Card
            component="label"
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: theme.spacing(5),
              cursor: "pointer",
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.secondary,
              borderStyle: "dashed",
              "&:hover": {
                zIndex: 1,
                opacity: 0.75,
              },
            }}
            variant="outlined"
          >
            <Stack alignItems="center" gap={2}>
              <Stack alignItems="center" gap={2}>
                <SvgIcon fontSize="medium" inheritViewBox>
                  <Iconify icon="eva:search-fill" />
                </SvgIcon>
                <Typography variant="body2" align="center">
                  Pilih gambar dari perangkat
                </Typography>
              </Stack>
              <Typography variant="caption" align="center" fontWeight={700}>
                <small>
                  Format file *.jpeg, *.jpg, *.png. <br /> Maks. ukuran file 2
                  MB.
                </small>
              </Typography>
            </Stack>
            <HiddenInput
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleSetSelectedFile(e);
              }}
            />
          </Card>
        </Stack>
      ) : (
        <div>
          <Card
            sx={{
              marginTop: theme.spacing(2),
            }}
            variant="outlined"
          >
            <CardContent>
              <Stack direction="row" mb={2}>
                <Typography variant="h6" color={theme.palette.text.primary}>
                  Preview
                </Typography>
                <Box ml="auto">
                  <IconButton
                    size="small"
                    color="error"
                    sx={{ textTransform: "none" }}
                    onClick={() => handleDeleteFile()}
                  >
                    <SvgIcon fontSize="small" inheritViewBox>
                      <Iconify icon="eva:trash-2-outline" />
                    </SvgIcon>
                  </IconButton>
                </Box>
              </Stack>
              <Grid container justifyContent="center" p={0}>
                <Grid xs={12} spacing={2}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "auto",
                    }}
                  >
                    <Avatar
                      src={PreviewLink}
                      variant="rounded"
                      sx={{
                        width: "75%",
                        height: "auto",
                      }}
                    />
                    <Stack
                      direction="row"
                      color="text.secondary"
                      justifyContent="space-between"
                      mt={2}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Typography variant="caption" align="left">
                        Ukuran:{" "}
                        {`${bytesConverter(SelectedFile?.size)} ${bytesConstant(
                          SelectedFile?.size
                        )}`}
                      </Typography>
                      <Typography variant="caption" align="right">
                        Tipe:{" "}
                        {SelectedFile?.type?.split("/")?.[1]?.toUpperCase()}
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </div>
      )}
    </Box>
  );
};

export default UploadForm;
