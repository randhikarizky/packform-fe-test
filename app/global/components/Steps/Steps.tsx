import {
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  Stepper,
  stepConnectorClasses,
  styled,
} from "@mui/material";

import Iconify from "../Icon/iconify";
import { Dispatch, SetStateAction, useState } from "react";

const Connector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderRadius: 1,
    borderTopWidth: 3,
    borderColor: theme.palette.divider,
  },
}));

const IconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    height: 22,
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.disabled,
    ...(ownerState.active && {
      color: theme.palette.success.main,
    }),
    "& .QontoStepIcon-completedIcon": {
      zIndex: 1,
      fontSize: 18,
      color: theme.palette.success.main,
    },
    "& .QontoStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

const Icon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <IconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Iconify icon="eva:checkmark-fill" width={24} height={24} />
      ) : (
        <Iconify icon="radix-icons:dot-filled" width={28} height={28} />
      )}
    </IconRoot>
  );
};

type Props = {
  Steps: { label: string; id: number }[];
  ActiveStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export default function Steps(props: Props) {
  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={props.ActiveStep}
        connector={<Connector />}
        sx={{
          width: "100%",
        }}
      >
        {props.Steps.map((d) => (
          <Step key={d.id}>
            <StepLabel StepIconComponent={Icon}>{d.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
