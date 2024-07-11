import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import dayjs from "dayjs";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";

import Iconify from "../Icon/iconify";
import { bytesConstant, bytesConverter } from "../../helper/converter.helper";
import { DownloadFile } from "../../hooks/useFile";

type Props = {
  show: boolean;
  name: string;
  setValue: UseFormSetValue<any>;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
  recorded: File | null;
};

const AudioRecordForm = (props: Props) => {
  const theme = useTheme();
  const RecorderRef = useRef<MediaRecorder | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [Permission, setPermission] = useState(false);
  const [Stream, setStream] = useState<MediaStream | null>(null);
  const [RecorderStatus, setRecorderStatus] = useState<
    "idle" | "recording" | "paused"
  >("idle");
  const [Chunks, setChunks] = useState<any>([]);
  const [AudioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [AudioURL, setAudioURL] = useState<string | null>(null);

  useEffect(() => {
    if (
      props.watch().voice_note !== null &&
      typeof props.watch().voice_note === "object"
    ) {
      const blob = new File(
        [props.watch().voice_note],
        `${props
          .watch()
          .nama_generik?.toUpperCase()
          .split(" ")
          .join("_")}-${props
          .watch()
          .nama_spesifik?.toUpperCase()
          .split(" ")
          .join("_")}-${dayjs().format("DD/MM/YYYY HH:mm:ss")}.mp3`,
        { type: "audio/webm" }
      );

      const url = URL.createObjectURL(blob);

      props.setValue(props.name, blob);
      props.setValue(`${props.name}_url`, url);

      setAudioBlob(blob);
      setAudioURL(url);
      setPermission(true);
    }
  }, []);

  const getPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        setPermission(true);
        setStream(streamData);
      } catch (error) {
        console.error(error);
      }
    } else {
      enqueueSnackbar(
        "Perekaman audio sepertinya tidak didukung oleh perangkat atau browser.",
        {
          variant: "warning",
        }
      );
    }
  };

  const start = async () => {
    setRecorderStatus("recording");

    if (Stream !== null) {
      const media = new MediaRecorder(Stream, { mimeType: "audio/webm" });

      RecorderRef.current = media;

      RecorderRef.current.start();

      let chunks: any = [];

      RecorderRef.current.ondataavailable = (e) => {
        if (typeof e.data === "undefined") return;
        if (e.data.size === 0) return;

        chunks.push(e.data);
      };

      setChunks(chunks);
    }
  };

  const stop = () => {
    setRecorderStatus("idle");

    RecorderRef.current?.stop();

    if (RecorderRef.current !== null) {
      RecorderRef.current.onstop = () => {
        const blob = new File(
          Chunks,
          `${props
            .watch()
            .nama_generik?.toUpperCase()
            .split(" ")
            .join("_")}-${props
            .watch()
            .nama_spesifik?.toUpperCase()
            .split(" ")
            .join("_")}-${dayjs().format("DD/MM/YYYY HH:mm:ss")}.mp3`,
          { type: "audio/webm" }
        );

        const url = URL.createObjectURL(blob);

        props.setValue(props.name, blob);
        props.setValue(`${props.name}_url`, url);

        setAudioBlob(blob);
        setAudioURL(url);

        setChunks([]);
      };
    }
  };

  const fetchAudio = (audio: any) => {
    const blob = new File(
      [audio],
      `${props.watch().nama_generik?.toUpperCase().split(" ").join("_")}-${props
        .watch()
        .nama_spesifik?.toUpperCase()
        .split(" ")
        .join("_")}-${dayjs().format("DD/MM/YYYY HH:mm:ss")}.mp3`,
      { type: "audio/webm" }
    );

    const url = URL.createObjectURL(blob);

    props.setValue(props.name, blob);
    props.setValue(`${props.name}_url`, url);

    setAudioBlob(blob);
    setAudioURL(url);
  };

  const handleDeleteFile = () => {
    props.reset({
      [props.name]: null,
    });

    setRecorderStatus("idle");
    setChunks([]);
    setAudioBlob(null);
    setAudioURL(null);
  };

  return (
    <Box>
      {!Permission ? (
        <Alert variant="outlined" severity="warning">
          <AlertTitle>Izin diperlukan</AlertTitle>
          <Stack direction="column" rowGap={2}>
            Kami perlu memeriksa izin perangkat Anda untuk mengakses mikrofon.
            Klik tombol di bawah untuk memeriksa akses.
            <Button
              variant="contained"
              endIcon={<Iconify icon="solar:microphone-2-broken" />}
              sx={{
                fontWeight: "500",
                justifyContent: "space-between",
              }}
              onClick={() => getPermission()}
            >
              Periksa akses
            </Button>
          </Stack>
        </Alert>
      ) : // if recorded audio exist
      RecorderStatus === "idle" && AudioURL !== null && AudioBlob !== null ? (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(1),
            color: theme.palette.text.secondary,
            borderStyle: "dashed",
            borderColor: theme.palette.background.neutral,
            transition: "opacity ease-in-out .10s",
          }}
          variant="outlined"
        >
          <CardContent>
            <Stack direction="row" mb={5} px={{ xs: "3dvw" }}>
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
            <Grid container justifyContent="center">
              <Grid xs={12} spacing={2}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "auto",
                  }}
                >
                  <audio
                    src={AudioURL}
                    controls
                    style={{ paddingLeft: "3dvw", paddingRight: "3dvw" }}
                  />
                  <Stack
                    direction="row"
                    color="text.secondary"
                    justifyContent="space-between"
                    mt={2}
                    px={{ xs: "3dvw" }}
                    sx={{
                      width: "100%",
                    }}
                  >
                    <Typography variant="caption" align="left">
                      Ukuran:{" "}
                      {`${bytesConverter(AudioBlob?.size)} ${bytesConstant(
                        AudioBlob?.size
                      )}`}
                    </Typography>
                    <Box ml="auto">
                      <a>
                        <IconButton
                          title="Unduh"
                          size="small"
                          color="success"
                          sx={{ textTransform: "none" }}
                          onClick={() =>
                            DownloadFile(
                              AudioBlob,
                              `${props
                                .watch()
                                .nama_generik?.split(" ")
                                ?.join("-")
                                .toUpperCase()}_VOICE-NOTE_GURILAP_${dayjs().format(
                                "DD/MM/YYYY"
                              )}.mp3`
                            )
                          }
                        >
                          <SvgIcon fontSize="small" inheritViewBox>
                            <Iconify icon="eva:download-fill" />
                          </SvgIcon>
                        </IconButton>
                      </a>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(5),
            cursor: AudioURL === null ? "pointer" : "unset",
            backgroundColor:
              RecorderStatus === "idle"
                ? theme.palette.background.default
                : RecorderStatus === "recording"
                ? theme.palette.error.lighter
                : theme.palette.background.default,
            color:
              RecorderStatus === "idle"
                ? theme.palette.error.dark
                : RecorderStatus === "recording"
                ? theme.palette.error.dark
                : theme.palette.text.secondary,
            borderStyle: "dashed",
            transition: "box-shadow ease-in-out .10s",
            boxShadow:
              RecorderStatus === "recording"
                ? theme.customShadows.error
                : "unset",
            "&:hover": {
              opacity: ".75",
            },
          }}
          variant="outlined"
          onClick={() =>
            RecorderStatus === "idle"
              ? start()
              : RecorderStatus === "recording"
              ? stop()
              : console.log("Aksi tidak valid")
          }
        >
          <Stack alignItems="center" gap={2}>
            <SvgIcon sx={{ fontSize: "2.5rem" }} inheritViewBox>
              {RecorderStatus === "idle" ? (
                <Iconify icon="fluent:record-12-regular" />
              ) : RecorderStatus === "recording" ? (
                <Iconify icon="ph:stop-fill" />
              ) : (
                <Iconify icon="fluent:record-12-regular" />
              )}
            </SvgIcon>
            {RecorderStatus === "idle" ? (
              <Typography variant="body2" align="center">
                Ketuk untuk mulai merekam
              </Typography>
            ) : RecorderStatus === "recording" ? (
              <Stack>
                {/* <Typography variant="h3" align="center">
                  0:00
                </Typography> */}
                <Typography variant="body2" align="center" mt={1}>
                  Merekam ...
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  sx={{ opacity: ".5" }}
                >
                  Ketuk untuk berhenti
                </Typography>
              </Stack>
            ) : (
              <Iconify icon="fluent:record-12-regular" />
            )}
          </Stack>
        </Card>
      )}
    </Box>
  );
};

export default AudioRecordForm;
