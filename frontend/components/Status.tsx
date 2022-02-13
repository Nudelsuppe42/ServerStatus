import * as React from "react";

import { Button, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Head from "next/head";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import { purple } from "@mui/material/colors";

interface StatusProps {
  status: string;
  color: string;
  sx?: any;
}

export function Status({ status, color, sx }: StatusProps) {
    const StatusButton = styled(Button)(({ theme }) => ({
        color: "white",
        backgroundColor: color,
      }));

  return (
    <StatusButton sx={sx}>{status}</StatusButton>

  );
}
