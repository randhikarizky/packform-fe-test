import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Denied() {
  const router = useRouter();

  return (
    <>
      <Card>
        <CardContent>
          <Stack
            spacing={2}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h3">Anda belum masuk!</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Sepertinya Anda belum masuk atau mendaftar.
              <br /> Anda diperlukan masuk atau mendaftar untuk mengakses
              halaman ini.
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/auth/register")}
              sx={{
                mt: 2,
              }}
            >
              Masuk
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
