"use client";

import { JSX } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { BrainIcon as Brain } from "@phosphor-icons/react";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiChevronDown,
  FiChevronsDown,
  FiChevronsUp,
  FiClipboard,
  FiCpu,
  FiDatabase,
  FiEdit2,
  FiFile,
  FiGlobe,
  FiInfo,
  FiMail,
} from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import axeroImage from "@public/Axero.jpeg";
import airtableIcon from "@public/Airtable.svg";
import amazonSVG from "@public/Amazon.svg";
import anthropicSVG from "@public/Anthropic.svg";
import asanaIcon from "@public/Asana.png";
import azureIcon from "@public/Azure.png";
import bitbucketIcon from "@public/Bitbucket.svg";
import clickupIcon from "@public/Clickup.svg";
import cohereIcon from "@public/Cohere.svg";
import confluenceSVG from "@public/Confluence.svg";
import deepseekSVG from "@public/Deepseek.svg";
import discordIcon from "@public/discord.png";
import discourseIcon from "@public/Discourse.png";
import document360Icon from "@public/Document360.png";
import dropboxIcon from "@public/Dropbox.png";
import egnyteIcon from "@public/Egnyte.png";
import firefliesIcon from "@public/Fireflies.png";
import freshdeskIcon from "@public/Freshdesk.png";
import geminiSVG from "@public/Gemini.svg";
import gitbookDarkIcon from "@public/GitBookDark.png";
import gitbookLightIcon from "@public/GitBookLight.png";
import githubLightIcon from "@public/Github.png";
import gongIcon from "@public/Gong.png";
import googleIcon from "@public/Google.png";
import googleCloudStorageIcon from "@public/GoogleCloudStorage.png";
import googleSitesIcon from "@public/GoogleSites.png";
import guruIcon from "@public/Guru.svg";
import highspotIcon from "@public/Highspot.png";
import hubSpotIcon from "@public/HubSpot.png";
import jiraSVG from "@public/Jira.svg";
import kimiIcon from "@public/Kimi.png";
import linearIcon from "@public/Linear.png";
import litellmIcon from "@public/litellm.png";
import mediawikiIcon from "@public/MediaWiki.svg";
import metaSVG from "@public/Meta.svg";
import microsoftIcon from "@public/microsoft.png";
import microsoftSVG from "@public/Microsoft.svg";
import mistralSVG from "@public/Mistral.svg";
import mixedBreadSVG from "@public/Mixedbread.png";
import nomicSVG from "@public/nomic.svg";
import OCIStorageSVG from "@public/OCI.svg";
import ollamaIcon from "@public/Ollama.png";
import openAISVG from "@public/Openai.svg";
import openSourceIcon from "@public/OpenSource.png";
import outlinePNG from "@public/Outline.png";
import qwenSVG from "@public/Qwen.svg";
import r2Icon from "@public/r2.png";
import s3Icon from "@public/S3.png";
import salesforceIcon from "@public/Salesforce.png";
import sharepointIcon from "@public/Sharepoint.png";
import slackIcon from "@public/Slack.png";
import teamsIcon from "@public/Teams.png";
import wikipediaIcon from "@public/Wikipedia.png";
import xenforoIcon from "@public/Xenforo.svg";
import zAIIcon from "@public/Z_AI.png";
import zendeskIcon from "@public/Zendesk.svg";
import zulipIcon from "@public/Zulip.png";
import testrailSVG from "@public/Testrail.svg";
import gitlabIcon from "@public/Gitlab.png";
import gmailIcon from "@public/Gmail.png";
import googleDriveIcon from "@public/GoogleDrive.png";
import loopioIcon from "@public/Loopio.png";
import notionIcon from "@public/Notion.png";
import productboardIcon from "@public/Productboard.png";
import slabLogoIcon from "@public/SlabLogo.png";

export interface IconProps {
  size?: number;
  className?: string;
}
export interface LogoIconProps extends IconProps {
  src: string | StaticImageData;
}
export type OnyxIconType = (props: IconProps) => JSX.Element;

export const defaultTailwindCSS = "my-auto flex flex-shrink-0 text-default";
export const defaultTailwindCSSBlue = "my-auto flex flex-shrink-0 text-link";

export const LogoIcon = ({
  size = 16,
  className = defaultTailwindCSS,
  src,
}: LogoIconProps) => (
  <Image
    style={{ width: `${size}px`, height: `${size}px` }}
    className={`w-[${size}px] h-[${size}px] ` + className}
    src={src}
    alt="Logo"
    width="96"
    height="96"
  />
);

// Helper to create simple icon components from react-icon libraries
export function createIcon(
  IconComponent: React.ComponentType<{ size?: number; className?: string }>
) {
  function IconWrapper({
    size = 16,
    className = defaultTailwindCSS,
  }: IconProps) {
    return <IconComponent size={size} className={className} />;
  }

  IconWrapper.displayName = `Icon(${
    IconComponent.displayName || IconComponent.name || "Component"
  })`;
  return IconWrapper;
}

/**
 * Creates a logo icon component that automatically supports dark mode adaptations.
 *
 * Depending on the options provided, the returned component handles:
 * 1. Light/Dark variants: If both `src` and `darkSrc` are provided, displays the
 *    appropriate image based on the current color theme.
 * 2. Monochromatic inversion: If `monochromatic` is true, applies a CSS color inversion
 *    in dark mode for a monochrome icon appearance.
 * 3. Static icon: If only `src` is provided, renders the image without dark mode adaptation.
 *
 * @param src - The image or SVG source used for the icon (light/default mode).
 * @param options - Optional settings:
 *   - darkSrc: The image or SVG source used specifically for dark mode.
 *   - monochromatic: If true, applies a CSS inversion in dark mode for monochrome logos.
 *   - sizeAdjustment: Number to add to the icon size (e.g., 4 to make icon larger).
 *   - classNameAddition: Additional CSS classes to apply (e.g., '-m-0.5' for margin).
 * @returns A React functional component that accepts {@link IconProps} and renders
 *          the logo with dark mode handling as needed.
 */
const createLogoIcon = (
  src: string | StaticImageData,
  options?: {
    darkSrc?: string | StaticImageData;
    monochromatic?: boolean;
    sizeAdjustment?: number;
    classNameAddition?: string;
  }
) => {
  const {
    darkSrc,
    monochromatic,
    sizeAdjustment = 0,
    classNameAddition = "",
  } = options || {};

  const LogoIconWrapper = ({
    size = 16,
    className = defaultTailwindCSS,
  }: IconProps) => {
    const adjustedSize = size + sizeAdjustment;

    // Build className dynamically (only apply monochromatic if no darkSrc)
    const monochromaticClass = !darkSrc && monochromatic ? "dark:invert" : "";
    const finalClassName = [className, classNameAddition, monochromaticClass]
      .filter(Boolean)
      .join(" ");

    // If darkSrc is provided, use CSS-based dark mode switching
    // This avoids hydration issues and content flashing since next-themes
    // sets the .dark class before React hydrates
    if (darkSrc) {
      return (
        <>
          <LogoIcon
            size={adjustedSize}
            className={`${finalClassName} dark:hidden`}
            src={src}
          />
          <LogoIcon
            size={adjustedSize}
            className={`${finalClassName} hidden dark:block`}
            src={darkSrc}
          />
        </>
      );
    }

    return (
      <LogoIcon size={adjustedSize} className={finalClassName} src={src} />
    );
  };

  LogoIconWrapper.displayName = "LogoIconWrapper";
  return LogoIconWrapper;
};

// ============================================================================
// GENERIC SVG COMPONENTS (sorted alphabetically)
// ============================================================================
export const AlertIcon = createIcon(FiAlertCircle);
export const ArtAsistantIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1.5C9.98656 1.4999 8.01555 2.07871 6.32185 3.16743C4.62815 4.25616 3.28318 5.8089 2.44724 7.6406C1.6113 9.47231 1.31963 11.5057 1.60699 13.4986C1.89435 15.4914 2.74862 17.3596 4.068 18.8805L10.422 12.6285C10.8429 12.2144 11.4096 11.9824 12 11.9824C12.5904 11.9824 13.1571 12.2144 13.578 12.6285L19.932 18.8805C21.2514 17.3596 22.1056 15.4914 22.393 13.4986C22.6804 11.5057 22.3887 9.47231 21.5528 7.6406C20.7168 5.8089 19.3719 4.25616 17.6782 3.16743C15.9845 2.07871 14.0134 1.4999 12 1.5ZM12 22.5C14.5238 22.5042 16.9639 21.5952 18.87 19.941L12.525 13.6965C12.3848 13.5591 12.1963 13.4821 12 13.4821C11.8037 13.4821 11.6152 13.5591 11.475 13.6965L5.13 19.941C7.03607 21.5952 9.47619 22.5042 12 22.5ZM0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM16.5 8.25C16.5 8.05109 16.421 7.86032 16.2803 7.71967C16.1397 7.57902 15.9489 7.5 15.75 7.5C15.5511 7.5 15.3603 7.57902 15.2197 7.71967C15.079 7.86032 15 8.05109 15 8.25C15 8.44891 15.079 8.63968 15.2197 8.78033C15.3603 8.92098 15.5511 9 15.75 9C15.9489 9 16.1397 8.92098 16.2803 8.78033C16.421 8.63968 16.5 8.44891 16.5 8.25ZM18 8.25C18 8.54547 17.9418 8.83806 17.8287 9.11104C17.7157 9.38402 17.5499 9.63206 17.341 9.84099C17.1321 10.0499 16.884 10.2157 16.611 10.3287C16.3381 10.4418 16.0455 10.5 15.75 10.5C15.4545 10.5 15.1619 10.4418 14.889 10.3287C14.616 10.2157 14.3679 10.0499 14.159 9.84099C13.9501 9.63206 13.7843 9.38402 13.6713 9.11104C13.5582 8.83806 13.5 8.54547 13.5 8.25C13.5 7.65326 13.7371 7.08097 14.159 6.65901C14.581 6.23705 15.1533 6 15.75 6C16.3467 6 16.919 6.23705 17.341 6.65901C17.7629 7.08097 18 7.65326 18 8.25Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const BookmarkIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75z"
      />
    </svg>
  );
};
export const BrainIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return <Brain size={size} className={className} />;
};
export const CPUIcon = createIcon(FiCpu);
export const DatabaseIcon = createIcon(FiDatabase);
export const CameraIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 5a1 1 0 0 0-1-1h-2L9 2H5L3.5 4h-2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1z" />
        <path d="M7 9.75a2.25 2.25 0 1 0 0-4.5a2.25 2.25 0 0 0 0 4.5" />
      </g>
    </svg>
  );
};
export const Caret = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0Z"
      />
    </svg>
  );
};
export const CheckmarkIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  );
};
export const ChevronDownIcon = createIcon(FiChevronDown);
export const ChevronsDownIcon = createIcon(FiChevronsDown);
export const ChevronsUpIcon = createIcon(FiChevronsUp);
export const ClipboardIcon = createIcon(FiClipboard);
export const DexpandTwoIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m.5 13.5l5-5m-4 0h4v4m8-12l-5 5m4 0h-4v-4"
      />
    </svg>
  );
};
export const DocumentIcon2 = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
};
export const DownloadCSVIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.5 10.5v1a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1M4 6l3 3.5L10 6M7 9.5v-9"
      />
    </svg>
  );
};
export const EditIcon = createIcon(FiEdit2);
export const EmailIcon = createIcon(FiMail);

//  COMPANY LOGOS
export const ExpandTwoIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.5 5.5l5-5m-4 0h4v4m-8 4l-5 5m4 0h-4v-4"
      />
    </svg>
  );
};
export const FileIcon = createIcon(FiFile);
export const FileOptionIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.6801 7.02928C20.458 6.5654 20.1451 6.15072 19.76 5.80973L16.76 3.09074C16.0939 2.47491 15.2435 2.09552 14.3401 2.01115C14.2776 1.99628 14.2125 1.99628 14.15 2.01115H8.21008C7.54764 1.98307 6.88617 2.08698 6.26428 2.31683C5.64239 2.54667 5.07249 2.89785 4.58765 3.34995C4.10281 3.80205 3.71274 4.34605 3.44019 4.95025C3.16763 5.55445 3.01797 6.20679 3 6.86934V17.1655C3.03538 18.1647 3.36978 19.1303 3.95984 19.9375C4.5499 20.7448 5.36855 21.3566 6.31006 21.6939C6.92247 21.9253 7.57613 22.0274 8.22998 21.9937H15.79C16.4525 22.0218 17.1138 21.9179 17.7357 21.6881C18.3576 21.4582 18.9276 21.107 19.4125 20.6549C19.8973 20.2028 20.2874 19.6588 20.5599 19.0546C20.8325 18.4504 20.982 17.7981 21 17.1355V8.56872C21.0034 8.03873 20.8944 7.51404 20.6801 7.02928ZM16.0601 7.41915C15.9174 7.42047 15.7759 7.39353 15.6437 7.33986C15.5115 7.2862 15.3913 7.20687 15.2899 7.10649C15.1886 7.00611 15.1081 6.88664 15.0532 6.755C14.9983 6.62336 14.97 6.48215 14.97 6.33953V3.69052C15.63 3.85046 18.2 6.48947 18.76 6.92931C18.9256 7.06878 19.0675 7.23423 19.1801 7.41915H16.0601Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const GlobeIcon = createIcon(FiGlobe);
export const GroupsIconSkeleton = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="6" r="4" />
        <path strokeLinecap="round" d="M15 9a3 3 0 1 0 0-6" />
        <ellipse cx="9" cy="17" rx="7" ry="4" />
        <path
          strokeLinecap="round"
          d="M18 14c1.754.385 3 1.359 3 2.5c0 1.03-1.014 1.923-2.5 2.37"
        />
      </g>
    </svg>
  );
};
export const InfoIcon = createIcon(FiInfo);
export const MacIcon = ({
  size = 16,
  className = "my-auto flex flex-shrink-0 ",
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6.5 4.5a2 2 0 0 1 2 2v2h-2a2 2 0 1 1 0-4Zm4 4v-2a4 4 0 1 0-4 4h2v3h-2a4 4 0 1 0 4 4v-2h3v2a4 4 0 1 0 4-4h-2v-3h2a4 4 0 1 0-4-4v2h-3Zm0 2h3v3h-3v-3Zm5-2v-2a2 2 0 1 1 2 2h-2Zm0 7h2a2 2 0 1 1-2 2v-2Zm-7 0v2a2 2 0 1 1-2-2h2Z"
      />
    </svg>
  );
};
export const NewChatIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 1.99982H6C3.79086 1.99982 2 3.79068 2 5.99982V13.9998C2 16.209 3.79086 17.9998 6 17.9998H14C16.2091 17.9998 18 16.209 18 13.9998V8.49982"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M17.1471 5.13076C17.4492 4.82871 17.6189 4.41901 17.619 3.9918C17.6191 3.56458 17.4494 3.15484 17.1474 2.85271C16.8453 2.55058 16.4356 2.38082 16.0084 2.38077C15.5812 2.38071 15.1715 2.55037 14.8693 2.85242L11.0562 6.66651L7.24297 10.4806C7.1103 10.6129 7.01218 10.7758 6.95726 10.9549L6.20239 13.4418C6.18762 13.4912 6.18651 13.5437 6.19916 13.5937C6.21182 13.6437 6.23778 13.6894 6.27428 13.7258C6.31078 13.7623 6.35646 13.7881 6.40648 13.8007C6.45651 13.8133 6.509 13.8121 6.5584 13.7972L9.04585 13.0429C9.2248 12.9885 9.38766 12.891 9.52014 12.7589L17.1471 5.13076Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const NotebookIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555a.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533Zm1.5 16.103A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
      />
    </svg>
  );
};
export const NotebookIconSkeleton = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
};
export const OnyxIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="100%"
    viewBox="0 0 320 304"
    enableBackground="new 0 0 320 304"
    xmlSpace="preserve"
  >
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M186.098816,164.042770   C183.419037,168.801926 179.797729,172.136124 175.778931,175.225922   C133.255859,207.919357 90.790009,240.687195 48.297108,273.419891   C47.192333,274.270905 46.379494,275.806396 44.522625,275.315796   C43.935116,273.542572 45.280807,272.511017 46.060928,271.351135   C76.930405,225.454987 107.819016,179.571686 138.724609,133.699844   C142.654022,127.867607 148.922333,124.680717 154.238632,120.468376   C194.063705,88.913147 234.006882,57.506912 273.935242,26.082205   C275.070618,25.188633 276.018768,23.884729 279.217773,23.659937   C247.886185,70.891029 217.089691,117.315475 186.098816,164.042770  M149.120987,140.658524   C144.459244,146.802521 143.810745,153.978561 147.405777,159.638382   C150.965500,165.242615 157.345901,167.902588 164.258514,166.664261   C170.214157,165.597397 175.270309,160.477509 176.461731,154.307236   C177.685089,147.971558 174.800217,141.358200 169.341507,137.984665   C162.760010,133.917236 156.793945,134.568588 149.120987,140.658524  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M133.886475,18.993153   C117.359207,11.340051 99.345520,18.847679 92.939972,36.100182   C91.302086,40.511620 89.032463,42.136719 84.325188,42.583431   C60.508152,44.843639 44.627693,67.526306 50.264317,90.702751   C52.232559,98.795692 52.232555,98.795685 45.293148,103.584541   C23.762373,118.442871 21.195114,147.798782 40.118477,165.915649   C43.360275,169.019302 42.145485,170.602036 40.045834,173.217560   C37.255970,176.692917 35.460522,174.221298 33.557041,172.493134   C11.682910,152.633606 13.368016,116.586464 37.162231,97.799370   C40.030468,95.534714 40.935776,93.413620 40.321865,89.763580   C35.959370,63.826065 52.809994,39.192039 78.677681,33.966564   C82.566223,33.181046 84.286804,31.321857 85.935104,28.202639   C95.253036,10.569513 114.886078,2.249208 132.809174,8.173566   C146.469757,12.688976 155.673859,24.619352 155.981995,39.964260   C156.430267,62.286598 156.135529,84.623817 156.162582,106.954689   C156.169312,112.509285 151.352158,113.417946 148.152679,116.003914   C145.980316,114.081482 146.762558,111.947853 146.755859,110.095787   C146.673386,87.264740 146.673004,64.433395 146.655731,41.602123   C146.648346,31.825802 142.702515,24.240295 133.886475,18.993153  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M30.589216,195.672440   C42.560539,175.032089 58.017971,158.428223 79.511154,148.218399   C92.252945,142.165695 105.635788,138.321136 119.942680,138.733231   C121.523041,138.778763 123.265411,138.231140 124.885223,139.674271   C123.936874,141.961166 121.571991,141.633698 119.885651,142.143234   C105.752213,146.413742 92.436058,152.244781 80.787842,161.541733   C78.458305,163.401047 76.651093,164.989563 78.902908,168.022217   C79.172791,168.385681 79.216263,168.972443 79.232529,169.460129   C79.339050,172.652679 66.694427,184.494415 63.709785,183.376022   C59.677635,181.865082 57.730003,184.287994 55.611897,186.418488   C43.693398,198.406677 33.899490,212.018250 25.391981,226.583176   C22.750408,231.105576 20.174192,235.666122 16.963179,239.954437   C18.083040,224.232025 22.908295,209.708313 30.589216,195.672440  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M281.663605,167.681931   C302.044281,147.841522 299.263641,117.926247 275.671051,102.869156   C271.288452,100.072128 270.510773,97.306686 272.004822,92.561218   C275.318634,82.035889 274.021729,71.825836 268.343903,62.303005   C264.606293,56.034283 264.609009,55.589668 270.575684,49.884743   C277.376862,56.313023 280.387451,64.549713 282.334503,73.369446   C283.614136,79.165955 283.539490,84.993340 282.174072,90.686890   C281.369598,94.041252 282.528137,95.737289 285.033295,97.715874   C306.485718,114.658890 310.937012,144.114990 295.552948,166.536362   C292.512024,170.968323 288.648987,174.671417 284.400055,177.895523   C282.277313,179.506241 281.422394,180.956665 282.073242,183.734100   C283.776642,191.003189 283.136658,198.276108 281.098419,205.415405   C280.616394,207.103836 280.494324,209.088562 278.121582,210.338867   C276.446594,206.168442 273.949249,202.186127 273.396332,197.950027   C272.834412,193.644958 274.400238,189.071793 272.194824,184.909409   C271.735870,184.763138 271.420837,184.569427 271.112244,184.579193   C268.691406,184.655807 265.377228,187.035843 264.332794,183.127319   C263.357849,179.478851 266.034637,176.675507 269.002075,175.258621   C273.382965,173.166840 277.692078,171.088913 281.663605,167.681931  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M230.444016,177.690323   C232.648178,175.130005 232.410141,173.201431 230.315842,170.933395   C223.613251,163.674835 216.323532,157.148239 208.005600,151.782791   C206.301819,150.683777 203.670700,149.920349 205.084152,146.941742   C206.531372,143.891922 208.877319,144.372894 211.433365,145.396423   C233.927078,154.403885 251.058685,169.634140 263.282593,190.402771   C274.838562,210.036560 279.947937,231.266373 278.208038,254.055771   C278.125671,255.135132 278.495453,256.441376 276.324890,257.476196   C274.487122,250.924835 272.542725,244.537766 270.317688,238.259491   C265.335236,224.200775 258.923462,210.911621 250.315659,198.707596   C248.696167,196.411514 247.404709,193.602234 243.706436,194.887863   C243.435760,194.981964 242.941879,194.900711 242.756744,194.706024   C237.940857,189.641861 231.769241,185.580795 230.444016,177.690323  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M217.220856,212.242447   C206.616974,221.647141 196.316391,230.861954 185.951920,240.004349   C184.037430,241.693130 183.292908,243.604752 183.331741,246.136536   C183.446701,253.631134 183.553513,261.134094 183.311478,268.622406   C183.192215,272.311798 184.245621,274.695862 187.395584,276.899597   C192.871002,280.730255 194.470245,287.559479 191.988739,293.366913   C189.486542,299.222839 183.730713,302.772980 177.683929,302.190002   C171.275208,301.572113 166.367859,297.083466 165.266495,290.382721   C164.354630,284.834961 166.197754,280.001465 170.858566,276.869995   C173.924927,274.809784 174.792648,272.409973 174.721313,268.949615   C174.546265,260.457367 174.767502,251.957230 174.614304,243.464142   C174.556366,240.252090 175.399033,237.790710 177.749649,235.479431   C193.897766,219.601517 210.886353,204.591278 226.550323,188.216599   C228.515732,186.162018 229.987503,186.454025 231.910400,188.465302   C237.544037,194.357880 237.607452,194.769409 231.528473,199.989365   C226.854019,204.003281 222.177658,208.014938 217.220856,212.242447  M179.362595,283.328979   C176.434662,283.361725 174.639328,284.801117 174.228104,287.706299   C173.918488,289.893585 174.778275,291.625977 176.780975,292.674469   C178.610214,293.632141 180.377319,293.282745 181.936203,292.107361   C185.013397,289.787140 184.201965,286.100586 179.362595,283.328979  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M173.803131,96.260597   C171.443375,98.144630 169.723862,100.240456 167.305481,101.276489   C165.019730,99.870346 165.869858,97.838638 165.863007,96.164230   C165.790726,78.503654 165.844193,60.842590 165.778015,43.181973   C165.720367,27.794264 171.699936,15.833542 186.075897,9.435626   C200.997513,2.794860 214.708817,6.183770 227.019867,16.294422   C230.788559,19.389515 233.986282,23.135059 235.917923,27.601637   C237.662460,31.635582 239.920792,34.237766 244.621872,34.320988   C246.146774,34.347980 247.954147,34.650150 249.623093,36.688076   C245.677658,39.002949 243.448212,43.536701 237.907211,42.985752   C233.477402,42.545292 230.973022,40.770981 229.425537,36.171555   C222.589020,15.852306 196.105118,9.000834 182.033356,23.651983   C177.556015,28.313681 175.358444,33.917221 175.354202,40.371105   C175.343369,56.865654 175.369186,73.360275 175.321182,89.854698   C175.315094,91.951889 175.924530,94.241417 173.803131,96.260597  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M120.919281,82.067635   C120.859962,89.540352 120.881569,96.527420 120.704536,103.509453   C120.623177,106.718376 121.501556,109.293152 123.929543,111.493500   C126.760658,114.059196 129.375183,116.864365 132.075638,119.573647   C137.735870,125.252388 137.723358,125.416458 130.910309,131.390060   C124.430206,125.623184 118.219398,119.496620 112.468689,112.902878   C111.292259,111.553978 111.656349,109.734398 111.653610,108.086746   C111.636459,97.773491 111.562355,87.459297 111.685043,77.147530   C111.719826,74.224632 110.998466,72.291649 108.332291,70.606628   C102.368851,66.837738 100.116592,59.837540 102.168022,53.128868   C103.858368,47.601028 109.869324,43.159161 115.763580,43.082249   C121.958153,43.001423 128.124039,47.233383 130.075226,52.905033   C132.312622,59.408566 130.586823,66.123474 124.536667,70.035156   C119.681816,73.174026 121.308350,77.501122 120.919281,82.067635  M118.308884,53.303371   C114.270088,51.597088 111.756645,53.566448 110.654526,57.129051   C109.743317,60.074528 111.544334,62.262058 114.351128,63.282299   C116.911858,64.213097 118.870560,62.960194 120.382736,60.975510   C122.636681,58.017277 121.187248,55.740490 118.308884,53.303371  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M144.729584,302.050903   C136.839310,301.587463 132.112823,298.325165 130.175385,292.337463   C128.277267,286.471283 130.015656,281.024597 135.807007,276.583649   C138.265732,274.698212 138.927612,272.601135 138.890320,269.763336   C138.789764,262.111115 138.735672,254.454529 138.893265,246.804413   C138.957535,243.684341 137.795303,241.490707 135.592819,239.409134   C130.914322,234.987457 125.802391,230.977188 121.800262,225.959579   C126.781181,219.307236 127.915901,219.203003 133.375443,224.590210   C137.046387,228.212555 140.617722,231.946503 144.444351,235.396835   C147.166763,237.851517 148.094543,240.715973 148.042206,244.258728   C147.916885,252.742462 147.987671,261.229004 147.960205,269.714325   C147.951889,272.283600 148.265244,274.451385 150.804230,276.120331   C156.024323,279.551636 158.250534,284.734161 157.023193,290.800751   C155.751541,297.086304 151.630142,300.949432 144.729584,302.050903  M148.534698,288.455811   C148.235031,287.530273 148.136047,286.462799 147.599701,285.704712   C145.660950,282.964386 143.118759,282.366028 140.409271,284.470764   C138.176132,286.205475 137.508423,288.605286 139.416458,290.937195   C141.523239,293.511932 144.180450,293.675110 146.775162,291.560577   C147.499664,290.970154 147.898712,289.980316 148.534698,288.455811  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M259.573853,224.639969   C262.736938,229.402374 260.796234,231.519409 256.364990,233.320847   C244.059280,238.323517 244.182709,238.515915 236.016144,248.812744   C225.751816,261.754547 212.493210,267.362396 196.019958,264.539093   C188.367798,263.227600 187.828934,262.279694 189.199280,254.009857   C191.390503,252.844452 193.346008,254.356796 195.307785,254.846939   C211.380325,258.862640 227.705902,250.490112 232.954880,234.917709   C234.588165,230.072144 237.199783,227.915970 242.149109,227.513657   C246.458313,227.163361 250.620712,225.801865 254.433167,223.641678   C256.320404,222.572357 258.078217,221.726120 259.573853,224.639969  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M252.830292,143.084869   C246.998703,141.364273 243.106277,143.072342 239.547714,147.567642   C234.799561,153.565628 233.699387,153.303726 227.904129,147.190231   C229.676529,143.777390 232.779816,141.454437 235.435623,138.790192   C237.571762,136.647247 238.507660,134.721069 237.770996,131.415802   C235.871994,122.895149 241.399277,115.142410 249.752747,113.776489   C258.000275,112.427895 265.146698,117.622826 266.745239,126.128769   C268.291656,134.357773 262.955719,141.051041 252.830292,143.084869  M257.002899,125.535561   C256.108337,124.267242 254.932434,123.415894 253.377472,123.181007   C249.855377,122.648979 247.468536,124.227257 246.713867,127.557022   C246.026779,130.588470 247.804489,132.723389 250.643661,133.499893   C254.009644,134.420486 256.501190,133.022980 257.490448,129.614502   C257.790771,128.579697 257.416870,127.349190 257.002899,125.535561  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M84.991592,133.026047   C82.746178,130.119720 80.424271,129.529831 76.983467,130.151993   C69.836990,131.444229 63.957035,127.995026 61.120747,121.740952   C58.508808,115.981590 59.885475,109.165161 64.533394,104.843513   C69.105614,100.592262 75.842361,99.868683 81.672920,103.002586   C87.300621,106.027458 90.219666,112.202713 88.719955,119.112648   C88.101143,121.963821 88.764992,123.841621 90.656021,125.782585   C93.631905,128.837067 96.964577,131.597916 99.326553,135.275101   C91.657600,139.522491 91.569328,139.508850 84.991592,133.026047  M70.107170,112.794228   C68.515579,116.064011 68.687813,118.926895 72.269783,120.700684   C74.842422,121.974648 77.206146,121.228500 78.828178,118.993965   C80.456337,116.750984 80.428604,114.211876 78.392181,112.231438   C75.921402,109.828552 73.180023,109.556999 70.107170,112.794228  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M195.337799,66.126541   C189.528946,62.060734 185.054337,57.766296 185.602798,50.122063   C186.096756,43.237545 190.436096,37.925587 197.336884,36.522049   C203.999634,35.166931 210.932938,38.526508 213.524704,44.365986   C216.581100,51.252319 215.054810,58.897545 209.404449,62.725479   C206.729172,64.537880 205.154175,66.243973 204.903336,69.745583   C204.570511,74.391571 200.024582,75.325905 196.504059,77.788803   C195.039230,73.703804 196.131592,70.001671 195.337799,66.126541  M205.435364,49.198204   C204.137650,46.554504 202.149719,44.858376 199.107635,45.710045   C196.561569,46.422844 194.701324,48.309597 194.566010,51.043903   C194.435822,53.674797 196.317291,55.252113 198.605759,56.143204   C202.394730,57.618557 205.136841,55.142864 205.435364,49.198204  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M165.801300,200.088867   C165.767395,190.208298 166.935913,188.266495 174.343735,185.521606   C175.896866,186.762833 175.309464,188.552963 175.316269,190.101135   C175.369705,202.258148 175.283325,214.416000 175.382477,226.572433   C175.407227,229.606171 174.909607,232.302017 172.233551,233.972733   C168.727478,236.161606 171.023529,240.210678 168.648026,242.956116   C163.868164,229.094620 166.640656,214.692322 165.801300,200.088867  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M100.992294,261.183899   C97.327408,259.446686 94.244865,257.455811 91.607841,254.922638   C90.147186,253.519516 87.039711,252.116760 89.816452,249.431854   C91.995293,247.325058 94.205475,244.663528 97.842491,247.703064   C104.404213,253.186844 111.801544,256.452820 120.658333,255.887146   C124.851555,255.619339 128.575333,253.672592 132.605301,253.006226   C135.183502,261.447113 134.228165,263.205780 126.054512,264.677063   C117.481728,266.220215 109.205185,265.190979 100.992294,261.183899  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M200.301453,198.496719   C209.413177,194.120865 208.261124,186.180344 208.126343,178.593399   C208.064224,175.097321 208.044083,171.587341 208.285233,168.103073   C208.485367,165.211700 210.271072,162.844696 212.890930,162.123077   C215.442307,161.420349 216.715622,164.290909 218.457413,165.715637   C219.114502,166.253128 219.623184,167.140244 219.143631,167.934967   C215.668732,173.693619 217.812653,179.994278 217.470825,186.024963   C217.286453,189.277649 216.405014,191.679657 214.052368,193.889450   C209.004227,198.631027 204.142349,203.570953 198.631607,208.993042   C197.048538,204.553726 198.553787,201.674927 200.301453,198.496719  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M156.146286,209.086945   C155.806351,219.683701 157.086136,229.857651 155.000824,239.893082   C154.747040,241.114426 154.673843,242.558182 153.352280,243.369308   C151.553009,242.486130 152.212067,240.807632 152.077438,239.421112   C151.933395,237.937653 152.272308,236.065811 151.039719,235.182968   C145.609894,231.293762 146.679260,225.642059 146.660828,220.254837   C146.651733,217.595871 146.993622,214.887222 146.602036,212.287613   C145.613129,205.722672 149.570740,202.691147 154.676193,200.013763   C157.062225,202.684631 155.753204,205.799652 156.146286,209.086945  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M51.145184,224.816315   C49.232944,222.278931 47.405174,220.100922 45.922356,217.709061   C41.350456,210.334320 41.663025,208.615997 48.281788,202.462997   C49.537651,202.522781 49.842133,203.610214 50.111107,204.473694   C52.734848,212.896576 57.635273,219.641006 65.034439,224.430817   C68.113312,226.423904 67.211853,228.195984 65.564674,230.542923   C63.936390,232.862869 62.517967,234.444382 59.589848,232.333939   C56.602993,230.181198 53.840797,227.814301 51.145184,224.816315  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M91.787376,189.453110   C91.656883,193.393829 89.100334,195.538437 86.503204,198.429413   C80.887360,194.203964 76.075012,189.388596 71.354050,184.829727   C71.658112,183.922867 71.678268,183.538925 71.877815,183.314407   C79.063362,175.229736 79.074608,175.223587 86.368706,183.155365   C88.162033,185.105484 89.876389,187.128235 91.787376,189.453110  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M257.441101,163.491669   C263.413239,170.107391 263.834137,172.719925 259.439972,177.709991   C255.891876,173.629791 252.326218,169.646027 248.904663,165.542084   C247.358704,163.687805 248.665863,162.503250 250.330826,161.736572   C252.951813,160.529648 255.132843,161.603622 257.441101,163.491669  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M57.165535,149.926041   C59.497158,149.997513 61.346794,150.610748 61.841091,152.616089   C62.326942,154.587097 60.277378,155.330536 59.135757,156.408859   C56.968296,158.456100 54.697689,160.395767 52.438316,162.343445   C51.212757,163.399933 49.985134,164.942841 48.196712,163.337738   C46.672901,161.970123 46.262539,160.176987 47.308689,158.379944   C49.532024,154.560791 52.659653,151.690704 57.165535,149.926041  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M109.369926,151.131302   C112.513443,149.478195 115.130646,149.917969 116.178810,152.930588   C117.085800,155.537445 114.919403,158.370056 113.034103,158.992340   C109.064445,160.302643 108.028358,155.908432 105.782326,154.084686   C105.988380,151.773285 107.829567,151.926056 109.369926,151.131302  z"
    />
    <path
      fill="#fcfcfc"
      opacity={1}
      stroke="none"
      d=" M222.502686,213.717712   C223.801300,212.947388 224.327454,211.258545 226.391083,212.131683   C224.545609,215.972992 222.226974,218.901138 217.170380,219.605865   C218.163422,216.546173 220.446213,215.442978 222.502686,213.717712  z"
    />
  </svg>
  );
};
export const OnyxLogoTypeIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  const aspectRatio = 2640 / 733; // Calculate the aspect ratio of the original SVG
  const height = size / aspectRatio; // Calculate the height based on the aspect ratio

  return (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 width="100%" viewBox="0 0 510 126" enable-background="new 0 0 510 126">
    <path fill="#020202" opacity="0.000000" stroke="none" 
      d="
    M334.000000,127.000000 
      C222.666687,127.000000 111.833374,127.000000 1.000045,127.000000 
      C1.000030,85.000031 1.000030,43.000053 1.000015,1.000062 
      C170.999939,1.000041 340.999878,1.000041 510.999878,1.000021 
      C510.999908,42.999935 510.999908,84.999870 510.999939,126.999901 
      C452.166656,127.000000 393.333344,127.000000 334.000000,127.000000 
    M32.916992,94.339531 
      C32.945641,94.562202 32.974293,94.784882 32.905304,95.686531 
      C29.868000,100.208588 26.830696,104.730652 23.793390,109.252708 
      C24.126883,109.527916 24.460375,109.803123 24.793867,110.078331 
      C32.621067,104.074776 40.409847,98.019775 48.312210,92.116844 
      C49.675262,91.098663 51.520630,90.726181 52.657860,90.525650 
      C53.294548,91.968964 53.601650,93.726646 54.625832,94.800346 
      C58.732498,99.105606 59.482529,106.027840 55.950127,110.643524 
      C53.877769,113.351395 53.739094,116.345650 56.538712,117.909210 
      C58.408237,118.953316 61.949924,118.944901 63.698635,117.804962 
      C66.268982,116.129417 65.976105,113.096687 64.059860,110.357307 
      C63.035042,108.892273 62.171513,106.986107 62.110966,105.248512 
      C62.009312,102.331100 62.278481,99.799408 64.257942,96.758842 
      C66.328819,93.577858 64.919617,88.104599 64.846062,83.636383 
      C64.842537,83.422501 63.045670,83.238152 61.376198,82.914940 
      C61.136868,82.904114 60.897541,82.893280 61.001144,82.272537 
      C63.519283,80.482277 66.037422,78.692009 68.302208,77.733803 
      C67.329613,84.448524 66.871895,91.134697 68.841301,98.278580 
      C70.033867,96.388863 70.782326,95.202866 71.611412,95.082016 
      C71.403351,98.040466 71.422867,101.038734 70.914299,103.944595 
      C70.516762,106.216003 69.860924,108.636482 68.609978,110.519005 
      C66.702950,113.388855 66.584183,116.355141 69.176125,117.950706 
      C70.967667,119.053581 74.557899,119.003860 76.368973,117.887215 
      C79.024353,116.249985 78.851143,113.160301 76.870987,110.451286 
      C76.047806,109.325111 75.134430,107.993149 74.999588,106.679092 
      C74.034096,97.270264 79.396858,90.365723 88.912704,88.107780 
      C88.912704,88.107780 89.106628,88.108871 89.106628,88.108871 
      C89.106628,88.108871 88.916275,88.176529 88.482887,87.477768 
      C90.315544,84.963120 92.148209,82.448479 94.683388,80.070686 
      C97.246292,83.423225 99.809189,86.775772 101.561737,90.175491 
      C98.446472,91.401512 93.671539,91.774986 92.522835,94.011200 
      C88.875336,101.111900 83.793770,103.282188 75.831367,101.918785 
      C76.592407,103.737793 77.608047,105.612564 78.953583,105.890556 
      C81.286179,106.372467 84.470413,106.789291 86.157051,105.606781 
      C92.045387,101.478477 97.445709,96.654129 103.716942,92.344749 
      C105.022011,95.932968 106.327080,99.521187 107.632149,103.109406 
      C108.150970,103.022560 108.669800,102.935707 109.188622,102.848862 
      C108.826630,98.730217 108.428864,94.614235 108.123108,90.491425 
      C108.023224,89.144646 107.916809,87.717194 108.244072,86.436707 
      C108.936172,83.728729 109.908386,81.092087 110.772911,78.428505 
      C111.271469,76.892479 111.314011,74.803741 112.365601,73.916649 
      C119.990257,67.484756 120.230583,53.156929 112.588440,46.258106 
      C111.442566,45.223682 111.093628,43.011387 110.890434,41.283478 
      C110.296677,36.234310 110.340195,30.986458 104.175385,27.678026 
      C105.743576,24.833103 107.311775,21.988180 108.879967,19.143257 
      C108.652321,18.961769 108.424675,18.780281 108.197029,18.598793 
      C104.828621,21.077810 101.460213,23.556828 97.458275,25.973125 
      C97.246475,25.959961 97.034668,25.946795 97.059464,25.225109 
      C97.288040,24.425634 97.963081,23.198195 97.673157,22.895735 
      C95.703384,20.840782 93.324654,19.159678 91.464249,17.021729 
      C87.235306,12.161885 81.453308,11.936589 76.352989,13.405540 
      C73.136948,14.331800 68.910706,18.260584 68.528450,21.272821 
      C67.460358,29.689547 68.156837,38.330196 68.156837,47.226471 
      C69.219849,46.744877 70.072182,46.358734 71.652969,46.073429 
      C71.896210,46.103886 72.139450,46.134342 72.061256,46.770538 
      C69.749763,48.530605 67.438278,50.290676 64.486320,51.988884 
      C64.272369,51.973778 64.058426,51.958672 64.093842,51.133507 
      C64.393646,49.888779 64.939377,48.646687 64.952766,47.398880 
      C65.031471,40.066479 65.140610,32.728657 64.946877,25.400393 
      C64.641006,13.830029 54.854435,9.652067 46.053028,14.255189 
      C39.276524,17.799292 33.102772,23.296629 26.775421,28.074905 
      C25.295332,29.192638 23.910053,31.262772 23.671207,33.053452 
      C22.663637,40.607483 19.384539,47.022026 15.843169,53.699738 
      C11.622071,61.659164 16.105768,71.743484 23.058966,74.599236 
      C18.185261,81.114243 14.693802,88.166962 15.030093,96.844574 
      C17.326117,93.134842 19.622141,89.425110 22.694550,85.499481 
      C24.550562,88.156425 26.183081,91.024719 28.385662,93.353935 
      C29.141073,94.152779 31.322863,93.602798 32.916992,94.339531 
    M378.923065,29.123522 
      C376.591187,29.113289 374.141724,28.658310 371.964691,29.233812 
      C370.228851,29.692686 367.946930,31.097124 367.409851,32.613873 
      C361.983368,47.938084 356.866486,63.371937 351.527130,79.176216 
      C346.222534,63.439812 341.092773,48.066395 335.790649,32.752651 
      C335.303497,31.345644 333.831329,29.440733 332.618469,29.282158 
      C329.060272,28.816929 325.402069,29.116461 321.727417,29.116461 
      C321.477386,30.208435 321.208496,30.837772 321.207123,31.467703 
      C321.164948,50.623489 321.191040,69.779549 321.090515,88.934959 
      C321.072388,92.390816 323.056366,92.602890 325.634583,92.508011 
      C328.124359,92.416382 330.862366,92.968575 330.816986,89.018997 
      C330.742310,82.523277 330.797516,76.026077 330.797699,69.529495 
      C330.797882,62.533367 330.797729,55.537239 330.797729,48.541107 
      C332.108246,49.075188 332.647247,49.709221 332.886658,50.441231 
      C337.068817,63.230755 341.174103,76.045586 345.401947,88.819885 
      C346.239410,91.350288 347.901520,92.842812 351.001862,92.580055 
      C353.719269,92.349770 355.341980,91.983582 356.358795,88.793610 
      C360.146606,76.910690 364.454895,65.193672 369.377136,53.938576 
      C369.629211,55.707901 370.085663,57.475655 370.099243,59.246811 
      C370.171906,68.715271 370.051971,78.186043 370.221802,87.652016 
      C370.247528,89.086624 371.442596,90.500259 372.782104,92.224503 
      C375.035278,92.280853 377.288452,92.337204 380.255585,92.669792 
      C380.623138,91.948753 380.990692,91.227722 381.408691,89.639465 
      C381.426208,70.235001 381.443726,50.830536 381.765045,30.725760 
      C381.113007,30.210026 380.460968,29.694294 378.923065,29.123522 
    M140.676987,56.548916 
      C141.037766,55.269409 141.479919,54.006588 141.746338,52.707726 
      C143.714874,43.111149 148.602875,38.579994 159.991928,37.337196 
      C166.792084,36.595146 174.815964,38.491982 177.868546,47.380520 
      C178.257980,48.514526 180.801086,49.533909 182.316681,49.493374 
      C184.095306,49.445801 185.841385,48.181465 189.138412,46.801735 
      C185.039398,41.551815 182.251434,35.943401 177.759842,32.679417 
      C169.936493,26.994308 160.101715,27.423389 151.462280,29.894152 
      C131.160370,35.700230 127.683907,54.854618 132.035278,71.667778 
      C138.609161,97.068398 170.433014,98.077354 186.676178,84.142288 
      C187.350632,83.563683 188.092606,82.587952 188.104401,81.786949 
      C188.213516,74.376793 188.168823,66.964378 188.168823,59.474251 
      C178.881104,59.474251 170.298477,59.474251 161.774872,59.474251 
      C160.087265,68.271652 160.363419,68.626724 168.608826,68.624977 
      C171.845184,68.624290 175.081558,68.624863 178.269547,68.624863 
      C178.679535,79.665413 176.109848,82.582397 165.907440,83.252937 
      C163.265350,83.426582 160.591492,83.407372 157.948959,83.228943 
      C150.244110,82.708717 144.713699,78.665237 142.342148,71.518951 
      C140.872025,67.088951 141.069077,62.105686 140.676987,56.548916 
    M272.383636,91.078384 
      C281.759644,95.107025 295.798035,92.953056 303.584442,84.977112 
      C311.905579,76.453400 313.438843,66.145782 312.070831,54.724308 
      C310.601990,42.460945 304.488129,33.634064 292.912659,30.242056 
      C281.870453,27.006308 270.748932,27.557919 261.762939,36.825649 
      C254.231964,44.592747 252.769272,53.988693 253.031403,64.220154 
      C253.309662,75.082497 261.060333,87.756561 272.383636,91.078384 
    M492.204163,63.319717 
      C489.044891,61.359207 486.096649,58.826691 482.679230,57.565788 
      C476.851013,55.415359 470.696991,54.165154 464.740997,52.337414 
      C461.206879,51.252880 457.577148,49.764057 458.124359,45.082066 
      C458.628632,40.767788 461.454803,38.385262 465.755646,38.047672 
      C468.725952,37.814518 471.726044,37.786686 474.705688,37.884632 
      C480.002960,38.058765 483.243439,40.707939 484.479462,46.000065 
      C484.721222,47.035191 486.233337,48.275990 487.343475,48.496609 
      C489.371490,48.899632 491.536896,48.611248 493.679626,48.611248 
      C494.802277,40.715115 491.175690,35.959900 485.714203,32.164021 
      C478.847382,27.391386 470.997009,28.747463 463.530548,29.242521 
      C456.444366,29.712357 449.667175,36.675510 448.830658,42.861603 
      C447.666687,51.468773 450.828949,57.286736 459.465332,60.624065 
      C466.020294,63.157082 472.938995,64.735634 479.646515,66.892410 
      C483.002563,67.971542 485.954285,69.446304 486.361664,73.773216 
      C486.795837,78.384659 484.325073,81.076447 480.768097,82.738884 
      C471.390808,87.121544 459.840393,82.205574 456.222412,72.510788 
      C454.740143,68.538895 451.798126,69.962013 449.103302,70.438148 
      C446.331085,70.927956 445.986389,72.300621 446.610291,75.079811 
      C448.085083,81.649254 451.212891,86.880035 457.373199,89.688705 
      C467.675293,94.385696 478.181946,94.851639 488.051819,88.768921 
      C496.753387,83.406219 499.192169,71.039093 492.204163,63.319717 
    M212.625076,83.120384 
      C211.195923,83.036621 209.766754,82.952866 208.334641,82.868935 
      C208.334641,76.417328 208.334641,70.333038 208.334641,63.768433 
      C219.564392,63.768433 230.635315,63.768433 241.608643,63.768433 
      C243.052429,55.251980 242.936646,55.110912 234.967316,55.110638 
      C226.214951,55.110340 217.462585,55.110573 208.426422,55.110573 
      C208.426422,49.302670 208.426422,44.049541 208.426422,38.051422 
      C220.257248,38.051422 232.107010,38.051422 243.781494,38.051422 
      C243.781494,34.714828 243.781494,32.124260 243.781494,29.472586 
      C228.705750,29.472586 214.007614,29.472586 198.901825,29.472586 
      C198.901825,49.791916 198.851944,69.746643 199.058838,89.698700 
      C199.068512,90.631798 201.356888,92.322693 202.603622,92.341225 
      C215.752182,92.536613 228.905182,92.404625 242.055771,92.510773 
      C244.913071,92.533836 246.019363,91.415520 245.835663,88.691963 
      C245.717377,86.938004 245.656601,85.180161 245.555084,83.120277 
      C234.538605,83.120277 224.071274,83.120277 212.625076,83.120384 
    M399.313324,54.698803 
      C394.664551,66.998390 390.015808,79.297974 385.287659,91.807625 
      C394.605713,93.280197 394.650635,93.298836 397.547180,86.319626 
      C399.239197,82.242767 400.760254,78.094963 402.416077,73.830132 
      C408.357727,73.830132 414.205109,74.210854 419.976959,73.714081 
      C424.921021,73.288567 427.674072,74.607254 428.641846,79.724846 
      C429.117188,82.238495 430.726807,84.521698 431.686920,86.962761 
      C434.078003,93.042175 437.485748,94.264969 444.234344,91.031830 
      C443.222748,88.657417 442.156677,86.272774 441.183105,83.850952 
      C434.323090,66.786629 427.451721,49.726719 420.660370,32.635048 
      C419.280609,29.162544 416.641998,28.972725 413.498871,29.031729 
      C410.566620,29.086773 408.902954,29.495375 407.810486,32.953697 
      C405.549316,40.111431 402.308411,46.959667 399.313324,54.698803 
    M46.120426,105.600922 
      C48.721066,105.760124 51.333199,106.149704 53.919456,106.020660 
      C57.210682,105.856438 57.549976,103.900101 56.087624,102.052689 
      C51.883904,101.518883 48.012321,100.341377 44.069824,99.493668 
      C42.763973,99.212891 41.275578,99.781097 39.870640,99.961136 
      C39.841881,100.507019 39.813118,101.052902 39.784359,101.598778 
      C41.673775,102.808220 43.563194,104.017654 46.120426,105.600922 
    z"/>
    <path fill="#EEEEEE" opacity="1.000000" stroke="none" 
      d="
    M381.461243,31.426071 
      C381.443726,50.830536 381.426208,70.235001 381.104095,90.118439 
      C380.380219,91.196136 379.960938,91.794853 379.541626,92.393570 
      C377.288452,92.337204 375.035278,92.280853 372.436035,91.608337 
      C372.089966,76.669868 372.089966,62.347569 372.089966,48.025269 
      C371.512909,47.983665 370.935822,47.942062 370.358765,47.900459 
      C369.761810,49.738438 369.164825,51.576416 368.567871,53.414391 
      C364.454895,65.193672 360.146606,76.910690 356.358795,88.793610 
      C355.341980,91.983582 353.719269,92.349770 351.001862,92.580055 
      C347.901520,92.842812 346.239410,91.350288 345.401947,88.819885 
      C341.174103,76.045586 337.068817,63.230755 332.886658,50.441231 
      C332.647247,49.709221 332.108246,49.075188 330.797729,48.541107 
      C330.797729,55.537239 330.797882,62.533367 330.797699,69.529495 
      C330.797516,76.026077 330.742310,82.523277 330.816986,89.018997 
      C330.862366,92.968575 328.124359,92.416382 325.634583,92.508011 
      C323.056366,92.602890 321.072388,92.390816 321.090515,88.934959 
      C321.191040,69.779549 321.164948,50.623489 321.207123,31.467703 
      C321.208496,30.837772 321.477386,30.208435 321.727417,29.116461 
      C325.402069,29.116461 329.060272,28.816929 332.618469,29.282158 
      C333.831329,29.440733 335.303497,31.345644 335.790649,32.752651 
      C341.092773,48.066395 346.222534,63.439812 351.527130,79.176216 
      C356.866486,63.371937 361.983368,47.938084 367.409851,32.613873 
      C367.946930,31.097124 370.228851,29.692686 371.964691,29.233812 
      C374.141724,28.658310 376.591187,29.113289 379.439880,29.437668 
      C380.458191,30.309900 380.959686,30.867987 381.461243,31.426071 
    z"/>
    <path fill="#F0F0F0" opacity="1.000000" stroke="none" 
      d="
    M140.597382,56.959843 
      C141.069077,62.105686 140.872025,67.088951 142.342148,71.518951 
      C144.713699,78.665237 150.244110,82.708717 157.948959,83.228943 
      C160.591492,83.407372 163.265350,83.426582 165.907440,83.252937 
      C176.109848,82.582397 178.679535,79.665413 178.269547,68.624863 
      C175.081558,68.624863 171.845184,68.624290 168.608826,68.624977 
      C160.363419,68.626724 160.087265,68.271652 161.774872,59.474251 
      C170.298477,59.474251 178.881104,59.474251 188.168823,59.474251 
      C188.168823,66.964378 188.213516,74.376793 188.104401,81.786949 
      C188.092606,82.587952 187.350632,83.563683 186.676178,84.142288 
      C170.433014,98.077354 138.609161,97.068398 132.035278,71.667778 
      C127.683907,54.854618 131.160370,35.700230 151.462280,29.894152 
      C160.101715,27.423389 169.936493,26.994308 177.759842,32.679417 
      C182.251434,35.943401 185.039398,41.551815 189.138412,46.801735 
      C185.841385,48.181465 184.095306,49.445801 182.316681,49.493374 
      C180.801086,49.533909 178.257980,48.514526 177.868546,47.380520 
      C174.815964,38.491982 166.792084,36.595146 159.991928,37.337196 
      C148.602875,38.579994 143.714874,43.111149 141.746338,52.707726 
      C141.479919,54.006588 141.037766,55.269409 140.597382,56.959843 
    z"/>
    <path fill="#F0F0F0" opacity="1.000000" stroke="none" 
      d="
    M271.993622,91.004242 
      C261.060333,87.756561 253.309662,75.082497 253.031403,64.220154 
      C252.769272,53.988693 254.231964,44.592747 261.762939,36.825649 
      C270.748932,27.557919 281.870453,27.006308 292.912659,30.242056 
      C304.488129,33.634064 310.601990,42.460945 312.070831,54.724308 
      C313.438843,66.145782 311.905579,76.453400 303.584442,84.977112 
      C295.798035,92.953056 281.759644,95.107025 271.993622,91.004242 
    M274.304871,82.693832 
      C287.929382,85.556793 295.605530,83.331650 299.807037,73.453339 
      C302.022980,68.243446 302.440765,61.855434 302.154297,56.074493 
      C301.392273,40.699158 285.551025,32.314461 272.443054,39.916107 
      C266.671814,43.263008 264.521210,48.838028 263.333679,54.997387 
      C261.507935,64.467178 264.072754,77.692192 274.304871,82.693832 
    z"/>
    <path fill="#EFEFEF" opacity="1.000000" stroke="none" 
      d="
    M492.438049,63.596336 
      C499.192169,71.039093 496.753387,83.406219 488.051819,88.768921 
      C478.181946,94.851639 467.675293,94.385696 457.373199,89.688705 
      C451.212891,86.880035 448.085083,81.649254 446.610291,75.079811 
      C445.986389,72.300621 446.331085,70.927956 449.103302,70.438148 
      C451.798126,69.962013 454.740143,68.538895 456.222412,72.510788 
      C459.840393,82.205574 471.390808,87.121544 480.768097,82.738884 
      C484.325073,81.076447 486.795837,78.384659 486.361664,73.773216 
      C485.954285,69.446304 483.002563,67.971542 479.646515,66.892410 
      C472.938995,64.735634 466.020294,63.157082 459.465332,60.624065 
      C450.828949,57.286736 447.666687,51.468773 448.830658,42.861603 
      C449.667175,36.675510 456.444366,29.712357 463.530548,29.242521 
      C470.997009,28.747463 478.847382,27.391386 485.714203,32.164021 
      C491.175690,35.959900 494.802277,40.715115 493.679626,48.611248 
      C491.536896,48.611248 489.371490,48.899632 487.343475,48.496609 
      C486.233337,48.275990 484.721222,47.035191 484.479462,46.000065 
      C483.243439,40.707939 480.002960,38.058765 474.705688,37.884632 
      C471.726044,37.786686 468.725952,37.814518 465.755646,38.047672 
      C461.454803,38.385262 458.628632,40.767788 458.124359,45.082066 
      C457.577148,49.764057 461.206879,51.252880 464.740997,52.337414 
      C470.696991,54.165154 476.851013,55.415359 482.679230,57.565788 
      C486.096649,58.826691 489.044891,61.359207 492.438049,63.596336 
    z"/>
    <path fill="#F4F4F4" opacity="1.000000" stroke="none" 
      d="
    M213.114502,83.120331 
      C224.071274,83.120277 234.538605,83.120277 245.555084,83.120277 
      C245.656601,85.180161 245.717377,86.938004 245.835663,88.691963 
      C246.019363,91.415520 244.913071,92.533836 242.055771,92.510773 
      C228.905182,92.404625 215.752182,92.536613 202.603622,92.341225 
      C201.356888,92.322693 199.068512,90.631798 199.058838,89.698700 
      C198.851944,69.746643 198.901825,49.791916 198.901825,29.472586 
      C214.007614,29.472586 228.705750,29.472586 243.781494,29.472586 
      C243.781494,32.124260 243.781494,34.714828 243.781494,38.051422 
      C232.107010,38.051422 220.257248,38.051422 208.426422,38.051422 
      C208.426422,44.049541 208.426422,49.302670 208.426422,55.110573 
      C217.462585,55.110573 226.214951,55.110340 234.967316,55.110638 
      C242.936646,55.110912 243.052429,55.251980 241.608643,63.768433 
      C230.635315,63.768433 219.564392,63.768433 208.334641,63.768433 
      C208.334641,70.333038 208.334641,76.417328 208.334641,82.868935 
      C209.766754,82.952866 211.195923,83.036621 213.114502,83.120331 
    z"/>
    <path fill="#EFEFEF" opacity="1.000000" stroke="none" 
      d="
    M399.391846,54.316994 
      C402.308411,46.959667 405.549316,40.111431 407.810486,32.953697 
      C408.902954,29.495375 410.566620,29.086773 413.498871,29.031729 
      C416.641998,28.972725 419.280609,29.162544 420.660370,32.635048 
      C427.451721,49.726719 434.323090,66.786629 441.183105,83.850952 
      C442.156677,86.272774 443.222748,88.657417 444.234344,91.031830 
      C437.485748,94.264969 434.078003,93.042175 431.686920,86.962761 
      C430.726807,84.521698 429.117188,82.238495 428.641846,79.724846 
      C427.674072,74.607254 424.921021,73.288567 419.976959,73.714081 
      C414.205109,74.210854 408.357727,73.830132 402.416077,73.830132 
      C400.760254,78.094963 399.239197,82.242767 397.547180,86.319626 
      C394.650635,93.298836 394.605713,93.280197 385.287659,91.807625 
      C390.015808,79.297974 394.664551,66.998390 399.391846,54.316994 
    M413.329193,42.969238 
      C410.776703,50.167732 408.224182,57.366226 405.609161,64.741119 
      C411.758820,64.741119 417.272797,64.741119 422.964142,64.741119 
      C421.920502,61.746311 421.134796,59.062176 420.059631,56.499458 
      C418.065674,51.746620 415.902618,47.064720 413.329193,42.969238 
    z"/>
    <path fill="#F7F7F7" opacity="1.000000" stroke="none" 
      d="
    M68.555557,76.901749 
      C66.037422,78.692009 63.519283,80.482277 60.504639,82.648682 
      C57.663193,85.372658 55.318256,87.720497 53.016945,90.080261 
      C53.060566,90.092194 53.143211,90.055443 53.143211,90.055443 
      C51.520630,90.726181 49.675262,91.098663 48.312210,92.116844 
      C40.409847,98.019775 32.621067,104.074776 24.793867,110.078331 
      C24.460375,109.803123 24.126883,109.527916 23.793390,109.252708 
      C26.830696,104.730652 29.868000,100.208588 33.220776,95.140533 
      C36.347023,90.364738 39.157803,86.134949 41.941700,81.926163 
      C41.914822,81.947166 41.942265,82.009636 42.142799,81.677277 
      C45.145775,77.159515 47.948219,72.974129 50.945862,68.592697 
      C51.384418,67.922264 51.627777,67.447876 52.122055,66.740555 
      C54.187477,63.818596 56.001976,61.129570 57.966721,58.302498 
      C58.311199,57.956509 58.417267,57.710541 58.721107,57.259266 
      C61.046955,55.411568 63.086868,53.731155 65.126785,52.050747 
      C67.438278,50.290676 69.749763,48.530605 72.543411,46.391624 
      C76.012894,43.285591 79.000229,40.558468 81.941238,37.862694 
      C81.894920,37.894043 81.828262,37.983887 82.156921,38.188492 
      C87.687645,34.274014 92.889725,30.154928 98.091797,26.035843 
      C101.460213,23.556828 104.828621,21.077810 108.197029,18.598793 
      C108.424675,18.780281 108.652321,18.961769 108.879967,19.143257 
      C107.311775,21.988180 105.743576,24.833103 104.611359,27.871212 
      C105.047325,28.064400 105.061012,27.964464 104.799324,27.635960 
      C104.026932,27.876556 103.516220,28.445662 102.744080,29.226564 
      C95.970802,39.224274 89.437561,48.996128 82.982712,58.819481 
      C82.386086,59.727459 82.288193,60.963154 82.003403,62.041546 
      C82.048080,62.036407 82.053749,61.946651 81.717194,61.752762 
      C81.119110,61.991825 80.857582,62.424782 80.323090,63.040821 
      C76.173660,67.827087 72.297195,72.430275 68.454559,77.000656 
      C68.488388,76.967857 68.555557,76.901749 68.555557,76.901749 
    M67.333954,70.027489 
      C70.988014,69.031471 72.314644,66.295593 70.918648,63.201115 
      C70.205521,61.620338 67.157822,59.789597 65.713257,60.167336 
      C63.850903,60.654312 61.478760,63.096752 61.226147,64.955269 
      C60.806328,68.043961 63.091164,70.055389 67.333954,70.027489 
    z"/>
    <path fill="#080808" opacity="0.000000" stroke="none" 
      d="
    M50.750664,68.788742 
      C47.948219,72.974129 45.145775,77.159515 41.816116,81.327896 
      C42.192825,77.016319 39.811012,75.027939 36.192371,73.591843 
      C36.675171,68.668167 40.202320,66.902641 43.665756,65.230171 
      C46.833435,63.700508 50.143589,62.465885 53.390953,61.101242 
      C53.284882,60.670422 53.178806,60.239601 53.072735,59.808777 
      C49.768444,60.183681 46.464157,60.558586 43.282173,60.592407 
      C43.241638,59.166821 43.233585,58.028427 42.879192,57.010616 
      C42.364647,55.532837 41.090191,54.160156 41.038849,52.710812 
      C40.891171,48.541702 38.479225,46.082561 34.902534,46.578133 
      C32.868809,46.859913 29.980507,49.886745 29.703510,51.973003 
      C29.213356,55.664719 31.899494,57.591610 35.926937,58.095837 
      C37.773823,58.327065 39.359531,60.644405 40.692856,62.029495 
      C37.369709,63.397663 34.417393,64.752045 31.465073,66.106430 
      C30.292965,65.056656 28.469301,64.268227 27.656563,64.862450 
      C26.442827,65.749863 25.009184,68.657394 25.279186,68.897881 
      C28.316284,71.603073 24.932024,72.006218 23.851528,72.839088 
      C23.083359,71.063446 22.571388,69.535973 21.668594,68.292168 
      C17.149719,62.066376 17.820202,53.903030 23.861483,49.138988 
      C26.581940,46.993683 27.316885,44.976807 26.938560,41.609722 
      C26.031576,33.537590 29.667616,28.866188 37.386745,26.508593 
      C39.350777,25.908733 41.472076,24.412233 42.587509,22.714367 
      C45.732468,17.927237 49.868706,15.627630 54.647831,17.113972 
      C59.588993,18.650707 60.837769,22.544237 60.770031,27.291693 
      C60.668034,34.440414 60.801281,41.592213 60.755150,48.742188 
      C60.740986,50.938374 60.687386,52.921886 63.844471,51.943565 
      C64.058426,51.958672 64.272369,51.973778 64.806549,52.019814 
      C63.086868,53.731155 61.046955,55.411568 58.535347,57.082726 
      C57.938366,56.957325 57.813072,56.841183 57.722630,56.383881 
      C57.683266,55.567390 57.785748,54.902630 57.508972,54.644447 
      C50.674480,48.269230 49.997814,41.486183 55.299114,33.647644 
      C56.182602,32.341312 55.164963,28.279222 53.755878,27.278231 
      C52.129692,26.123011 48.548344,26.092625 46.844238,27.182116 
      C45.445072,28.076647 44.346134,32.379200 45.195339,33.349304 
      C49.114693,37.826622 47.866554,42.932350 48.047863,47.891621 
      C48.202766,52.128754 52.160580,56.651646 56.982315,57.894371 
      C57.435284,58.213051 57.625877,58.326797 57.816475,58.440540 
      C56.001976,61.129570 54.187477,63.818596 51.899666,66.538963 
      C51.063324,65.916809 50.700287,65.263321 50.337254,64.609833 
      C50.009758,64.741669 49.682259,64.873505 49.354759,65.005341 
      C49.820065,66.266479 50.285366,67.527611 50.750664,68.788742 
    z"/>
    <path fill="#F4F4F4" opacity="1.000000" stroke="none" 
      d="
    M105.005615,28.092751 
      C110.340195,30.986458 110.296677,36.234310 110.890434,41.283478 
      C111.093628,43.011387 111.442566,45.223682 112.588440,46.258106 
      C120.230583,53.156929 119.990257,67.484756 112.365601,73.916649 
      C111.314011,74.803741 111.271469,76.892479 110.772911,78.428505 
      C109.908386,81.092087 108.936172,83.728729 108.244072,86.436707 
      C107.916809,87.717194 108.023224,89.144646 108.123108,90.491425 
      C108.428864,94.614235 108.826630,98.730217 109.188622,102.848862 
      C108.669800,102.935707 108.150970,103.022560 107.632149,103.109406 
      C106.327080,99.521187 105.022011,95.932968 103.366913,91.947968 
      C102.801956,91.076904 102.587021,90.602615 102.372086,90.128319 
      C99.809189,86.775772 97.246292,83.423225 94.315613,79.699234 
      C93.128014,78.217941 92.308189,77.108116 91.290497,75.656693 
      C90.055740,73.517487 89.018867,71.719864 87.959259,69.608093 
      C87.303947,68.865761 86.671371,68.437569 85.956284,67.665970 
      C84.494789,65.879990 83.115822,64.437431 81.939964,62.770264 
      C82.113297,62.345993 82.083527,62.146324 82.053749,61.946651 
      C82.053749,61.946651 82.048080,62.036407 82.383255,62.099434 
      C85.140984,62.760387 87.563522,63.358315 90.029343,64.290756 
      C90.743118,65.091125 91.413628,65.556976 92.239029,66.316086 
      C93.789192,67.699821 95.184464,68.790298 96.583023,69.876518 
      C100.388878,66.965134 102.398170,68.205070 102.841614,73.880615 
      C101.574036,73.676819 100.635567,73.527916 99.697090,73.379021 
      C99.840553,73.987350 99.984016,74.595680 100.127480,75.204018 
      C101.112129,74.757744 102.096779,74.311478 103.416702,73.800041 
      C116.147110,67.827271 117.675896,57.505665 107.632668,47.977825 
      C106.764023,47.153751 105.984474,45.911716 105.789352,44.757992 
      C104.959000,39.848351 104.364326,34.898853 103.897285,29.726988 
      C104.427650,28.981535 104.744331,28.473000 105.061012,27.964464 
      C105.061012,27.964464 105.047325,28.064400 105.005615,28.092751 
    M105.188644,81.588844 
      C105.135201,80.979034 105.081757,80.369232 105.028320,79.759422 
      C104.770172,79.820465 104.283974,79.917023 104.287148,79.937370 
      C104.371277,80.477516 104.505859,81.009804 105.188644,81.588844 
    M107.409523,84.487633 
      C107.409523,84.487633 107.523956,84.417496 107.409523,84.487633 
    z"/>
    <path fill="#EFEFEF" opacity="1.000000" stroke="none" 
      d="
    M63.969154,51.538536 
      C60.687386,52.921886 60.740986,50.938374 60.755150,48.742188 
      C60.801281,41.592213 60.668034,34.440414 60.770031,27.291693 
      C60.837769,22.544237 59.588993,18.650707 54.647831,17.113972 
      C49.868706,15.627630 45.732468,17.927237 42.587509,22.714367 
      C41.472076,24.412233 39.350777,25.908733 37.386745,26.508593 
      C29.667616,28.866188 26.031576,33.537590 26.938560,41.609722 
      C27.316885,44.976807 26.581940,46.993683 23.861483,49.138988 
      C17.820202,53.903030 17.149719,62.066376 21.668594,68.292168 
      C22.571388,69.535973 23.083359,71.063446 23.792887,72.997375 
      C23.682970,73.736847 23.502460,73.862732 23.268709,73.912285 
      C16.105768,71.743484 11.622071,61.659164 15.843169,53.699738 
      C19.384539,47.022026 22.663637,40.607483 23.671207,33.053452 
      C23.910053,31.262772 25.295332,29.192638 26.775421,28.074905 
      C33.102772,23.296629 39.276524,17.799292 46.053028,14.255189 
      C54.854435,9.652067 64.641006,13.830029 64.946877,25.400393 
      C65.140610,32.728657 65.031471,40.066479 64.952766,47.398880 
      C64.939377,48.646687 64.393646,49.888779 63.969154,51.538536 
    z"/>
    <path fill="#F3F3F3" opacity="1.000000" stroke="none" 
      d="
    M23.163837,74.255760 
      C23.502460,73.862732 23.682970,73.736847 23.868877,73.376343 
      C24.932024,72.006218 28.316284,71.603073 25.279186,68.897881 
      C25.009184,68.657394 26.442827,65.749863 27.656563,64.862450 
      C28.469301,64.268227 30.292965,65.056656 31.465073,66.106430 
      C34.417393,64.752045 37.369709,63.397663 40.967056,61.918476 
      C42.128014,61.506947 42.643940,61.220219 43.159866,60.933491 
      C46.464157,60.558586 49.768444,60.183681 53.072735,59.808777 
      C53.178806,60.239601 53.284882,60.670422 53.390953,61.101242 
      C50.143589,62.465885 46.833435,63.700508 43.665756,65.230171 
      C40.202320,66.902641 36.675171,68.668167 35.854668,73.646790 
      C34.956665,74.738609 34.463097,75.412819 33.602341,76.098190 
      C29.131300,76.832954 26.376976,79.190384 24.533892,83.028748 
      C23.450674,83.920280 22.684422,84.817833 21.918167,85.715378 
      C19.622141,89.425110 17.326117,93.134842 15.030093,96.844574 
      C14.693802,88.166962 18.185261,81.114243 23.163837,74.255760 
    z"/>
    <path fill="#080808" opacity="0.000000" stroke="none" 
      d="
    M97.775040,26.004482 
      C92.889725,30.154928 87.687645,34.274014 82.210098,37.828514 
      C82.969948,35.608284 84.627960,34.045010 84.890587,32.274723 
      C85.258682,29.793493 85.447090,26.435049 84.087326,24.820076 
      C83.020309,23.552797 78.495712,23.339426 77.302681,24.501396 
      C75.780350,25.984083 75.386986,29.428898 75.764847,31.830055 
      C76.130699,34.154861 78.091194,36.228725 79.398064,38.493877 
      C80.155624,38.300053 81.071594,38.065701 81.987564,37.831348 
      C79.000229,40.558468 76.012894,43.285591 72.704132,46.088760 
      C72.139450,46.134342 71.896210,46.103886 71.497879,45.654827 
      C71.547424,39.307423 71.830666,33.380005 71.935204,27.449440 
      C72.045982,21.164553 73.869316,17.996679 78.225540,16.988287 
      C83.156227,15.846916 87.665588,17.852858 90.072983,22.878416 
      C91.609383,26.085735 93.675888,26.894125 96.822868,25.933626 
      C97.034668,25.946795 97.246475,25.959961 97.775040,26.004482 
    z"/>
    <path fill="#F0F0F0" opacity="1.000000" stroke="none" 
      d="
    M91.488373,75.998283 
      C92.308189,77.108116 93.128014,78.217941 93.964355,79.630806 
      C92.148209,82.448479 90.315544,84.963120 88.752190,87.829399 
      C89.021492,88.181030 89.102180,88.248688 89.102180,88.248688 
      C79.396858,90.365723 74.034096,97.270264 74.999588,106.679092 
      C75.134430,107.993149 76.047806,109.325111 76.870987,110.451286 
      C78.851143,113.160301 79.024353,116.249985 76.368973,117.887215 
      C74.557899,119.003860 70.967667,119.053581 69.176125,117.950706 
      C66.584183,116.355141 66.702950,113.388855 68.609978,110.519005 
      C69.860924,108.636482 70.516762,106.216003 70.914299,103.944595 
      C71.422867,101.038734 71.403351,98.040466 71.548950,94.597061 
      C71.486488,94.112114 71.422684,94.026711 71.786804,94.181046 
      C75.153793,91.544876 78.156662,88.754372 81.492828,85.942108 
      C83.543839,83.974937 85.261536,82.029541 87.317558,80.004211 
      C88.933372,78.615616 90.210869,77.306946 91.488373,75.998283 
    z"/>
    <path fill="#F2F2F2" opacity="1.000000" stroke="none" 
      d="
    M96.941162,25.579369 
      C93.675888,26.894125 91.609383,26.085735 90.072983,22.878416 
      C87.665588,17.852858 83.156227,15.846916 78.225540,16.988287 
      C73.869316,17.996679 72.045982,21.164553 71.935204,27.449440 
      C71.830666,33.380005 71.547424,39.307423 71.133652,45.604408 
      C70.072182,46.358734 69.219849,46.744877 68.156837,47.226471 
      C68.156837,38.330196 67.460358,29.689547 68.528450,21.272821 
      C68.910706,18.260584 73.136948,14.331800 76.352989,13.405540 
      C81.453308,11.936589 87.235306,12.161885 91.464249,17.021729 
      C93.324654,19.159678 95.703384,20.840782 97.673157,22.895735 
      C97.963081,23.198195 97.288040,24.425634 96.941162,25.579369 
    z"/>
    <path fill="#F0F0F0" opacity="1.000000" stroke="none" 
      d="
    M62.083946,83.040047 
      C63.045670,83.238152 64.842537,83.422501 64.846062,83.636383 
      C64.919617,88.104599 66.328819,93.577858 64.257942,96.758842 
      C62.278481,99.799408 62.009312,102.331100 62.110966,105.248512 
      C62.171513,106.986107 63.035042,108.892273 64.059860,110.357307 
      C65.976105,113.096687 66.268982,116.129417 63.698635,117.804962 
      C61.949924,118.944901 58.408237,118.953316 56.538712,117.909210 
      C53.739094,116.345650 53.877769,113.351395 55.950127,110.643524 
      C59.482529,106.027840 58.732498,99.105606 54.625832,94.800346 
      C53.601650,93.726646 53.294548,91.968964 52.900536,90.290543 
      C53.143211,90.055443 53.060566,90.092194 53.388107,89.971474 
      C55.980381,91.154785 58.245113,92.458817 60.204060,93.586777 
      C60.840538,90.015945 61.462246,86.527992 62.083946,83.040047 
    z"/>
    <path fill="#ECECEC" opacity="1.000000" stroke="none" 
      d="
    M101.966904,90.151901 
      C102.587021,90.602615 102.801956,91.076904 103.024185,91.822731 
      C97.445709,96.654129 92.045387,101.478477 86.157051,105.606781 
      C84.470413,106.789291 81.286179,106.372467 78.953583,105.890556 
      C77.608047,105.612564 76.592407,103.737793 75.831367,101.918785 
      C83.793770,103.282188 88.875336,101.111900 92.522835,94.011200 
      C93.671539,91.774986 98.446472,91.401512 101.966904,90.151901 
    z"/>
    <path fill="#080808" opacity="0.000000" stroke="none" 
      d="
    M24.850857,83.034752 
      C26.376976,79.190384 29.131300,76.832954 33.616699,76.454346 
      C35.703323,79.986908 38.160519,82.000412 41.968582,81.905167 
      C39.157803,86.134949 36.347023,90.364738 33.269600,94.801048 
      C32.974293,94.784882 32.945641,94.562202 32.892647,93.655052 
      C30.195818,89.658638 27.523336,86.346695 24.850857,83.034752 
    z"/>
    <path fill="#5B5B5B" opacity="0.000000" stroke="none" 
      d="
    M368.972504,53.676483 
      C369.164825,51.576416 369.761810,49.738438 370.358765,47.900459 
      C370.935822,47.942062 371.512909,47.983665 372.089966,48.025269 
      C372.089966,62.347569 372.089966,76.669868 372.093384,91.457886 
      C371.442596,90.500259 370.247528,89.086624 370.221802,87.652016 
      C370.051971,78.186043 370.171906,68.715271 370.099243,59.246811 
      C370.085663,57.475655 369.629211,55.707901 368.972504,53.676483 
    z"/>
    <path fill="#F2F2F2" opacity="1.000000" stroke="none" 
      d="
    M71.422684,94.026711 
      C71.422684,94.026711 71.486488,94.112114 71.508636,94.064491 
      C70.782326,95.202866 70.033867,96.388863 68.841301,98.278580 
      C66.871895,91.134697 67.329613,84.448524 68.428879,77.317780 
      C68.555557,76.901749 68.488388,76.967857 68.908699,77.121628 
      C70.203094,77.832367 71.830589,78.385468 71.833466,78.946892 
      C71.859222,83.972664 71.598869,88.999901 71.422684,94.026711 
    z"/>
    <path fill="#ECECEC" opacity="1.000000" stroke="none" 
      d="
    M45.786522,105.414001 
      C43.563194,104.017654 41.673775,102.808220 39.784359,101.598778 
      C39.813118,101.052902 39.841881,100.507019 39.870640,99.961136 
      C41.275578,99.781097 42.763973,99.212891 44.069824,99.493668 
      C48.012321,100.341377 51.883904,101.518883 56.087624,102.052689 
      C57.549976,103.900101 57.210682,105.856438 53.919456,106.020660 
      C51.333199,106.149704 48.721066,105.760124 45.786522,105.414001 
    z"/>
    <path fill="#E1E1E1" opacity="1.000000" stroke="none" 
      d="
    M24.533890,83.028748 
      C27.523336,86.346695 30.195818,89.658638 32.860649,93.319809 
      C31.322863,93.602798 29.141073,94.152779 28.385662,93.353935 
      C26.183081,91.024719 24.550562,88.156425 22.306358,85.607430 
      C22.684422,84.817833 23.450674,83.920280 24.533890,83.028748 
    z"/>
    <path fill="#1D1D1D" opacity="0.000000" stroke="none" 
      d="
    M61.730072,82.977493 
      C61.462246,86.527992 60.840538,90.015945 60.204060,93.586777 
      C58.245113,92.458817 55.980381,91.154785 53.344482,89.959541 
      C55.318256,87.720497 57.663193,85.372658 60.333168,82.953644 
      C60.897541,82.893280 61.136868,82.904114 61.730072,82.977493 
    z"/>
    <path fill="#5B5B5B" opacity="0.000000" stroke="none" 
      d="
    M381.613129,31.075916 
      C380.959686,30.867987 380.458191,30.309900 379.882812,29.465187 
      C380.460968,29.694294 381.113007,30.210026 381.613129,31.075916 
    z"/>
    <path fill="#5B5B5B" opacity="0.000000" stroke="none" 
      d="
    M379.898621,92.531677 
      C379.960938,91.794853 380.380219,91.196136 381.078857,90.552048 
      C380.990692,91.227722 380.623138,91.948753 379.898621,92.531677 
    z"/>
    <path fill="#F0F0F0" opacity="1.000000" stroke="none" 
      d="
    M88.968887,88.178780 
      C88.916275,88.176529 89.106628,88.108871 89.106628,88.108871 
      C89.106628,88.108871 88.912704,88.107780 89.007446,88.178238 
      C89.102180,88.248688 89.021492,88.181030 88.968887,88.178780 
    z"/>
    <path fill="#040404" opacity="0.000000" stroke="none" 
      d="
    M274.022156,82.416451 
      C264.072754,77.692192 261.507935,64.467178 263.333679,54.997387 
      C264.521210,48.838028 266.671814,43.263008 272.443054,39.916107 
      C285.551025,32.314461 301.392273,40.699158 302.154297,56.074493 
      C302.440765,61.855434 302.022980,68.243446 299.807037,73.453339 
      C295.605530,83.331650 287.929382,85.556793 274.022156,82.416451 
    z"/>
    <path fill="#101010" opacity="0.000000" stroke="none" 
      d="
    M413.569580,42.661263 
      C415.902618,47.064720 418.065674,51.746620 420.059631,56.499458 
      C421.134796,59.062176 421.920502,61.746311 422.964142,64.741119 
      C417.272797,64.741119 411.758820,64.741119 405.609161,64.741119 
      C408.224182,57.366226 410.776703,50.167732 413.569580,42.661263 
    z"/>
    <path fill="#050505" opacity="0.000000" stroke="none" 
      d="
    M103.683609,29.963903 
      C104.364326,34.898853 104.959000,39.848351 105.789352,44.757992 
      C105.984474,45.911716 106.764023,47.153751 107.632668,47.977825 
      C117.675896,57.505665 116.147110,67.827271 103.411407,73.852692 
      C103.070831,73.970505 103.170715,73.935516 103.170715,73.935516 
      C102.398170,68.205070 100.388878,66.965134 96.583023,69.876518 
      C95.184464,68.790298 93.789192,67.699821 92.541351,66.152328 
      C95.242271,64.482582 98.036827,63.598419 100.275177,61.956165 
      C102.164345,60.570103 104.674377,58.244278 104.588799,56.444771 
      C104.499603,54.569084 101.812958,51.647697 99.927910,51.358139 
      C98.073166,51.073242 95.141609,53.054680 93.865723,54.872234 
      C92.014900,57.508804 91.227203,60.891674 89.986069,63.956242 
      C87.563522,63.358315 85.140984,62.760387 82.338585,62.104568 
      C82.288193,60.963154 82.386086,59.727459 82.982712,58.819481 
      C89.437561,48.996128 95.970802,39.224274 102.819199,29.409969 
      C103.282082,29.620667 103.458031,29.814775 103.683609,29.963903 
    z"/>
    <path fill="#080808" opacity="0.000000" stroke="none" 
      d="
    M71.786804,94.181046 
      C71.598869,88.999901 71.859222,83.972664 71.833466,78.946892 
      C71.830589,78.385468 70.203094,77.832367 68.874870,77.154434 
      C72.297195,72.430275 76.173660,67.827087 80.608185,63.076046 
      C81.356445,62.950417 81.546646,62.972641 81.736855,62.994865 
      C83.115822,64.437431 84.494789,65.879990 85.579269,67.780312 
      C84.475166,69.640488 83.044853,71.014107 82.978165,72.451019 
      C82.811531,76.041374 83.146683,79.485558 79.948952,82.251945 
      C78.521477,83.486877 78.153542,85.570000 81.159531,85.963875 
      C78.156662,88.754372 75.153793,91.544876 71.786804,94.181046 
    z"/>
    <path fill="#050505" opacity="0.000000" stroke="none" 
      d="
    M66.926949,70.045540 
      C63.091164,70.055389 60.806328,68.043961 61.226147,64.955269 
      C61.478760,63.096752 63.850903,60.654312 65.713257,60.167336 
      C67.157822,59.789597 70.205521,61.620338 70.918648,63.201115 
      C72.314644,66.295593 70.988014,69.031471 66.926949,70.045540 
    z"/>
    <path fill="#EEEEEE" opacity="1.000000" stroke="none" 
      d="
    M41.941704,81.926163 
      C38.160519,82.000412 35.703323,79.986908 33.983887,76.443192 
      C34.463097,75.412819 34.956665,74.738609 35.787937,74.009445 
      C39.811012,75.027939 42.192825,77.016319 41.615585,81.660255 
      C41.942265,82.009636 41.914822,81.947166 41.941704,81.926163 
    z"/>
    <path fill="#0A0A0A" opacity="0.000000" stroke="none" 
      d="
    M50.945862,68.592697 
      C50.285366,67.527611 49.820065,66.266479 49.354759,65.005341 
      C49.682259,64.873505 50.009758,64.741669 50.337254,64.609833 
      C50.700287,65.263321 51.063324,65.916809 51.648746,66.771896 
      C51.627777,67.447876 51.384418,67.922264 50.945862,68.592697 
    z"/>
    <path fill="#020202" opacity="1.000000" stroke="none" 
      d="
    M103.897293,29.726988 
      C103.458031,29.814775 103.282082,29.620667 103.080627,29.198170 
      C103.516220,28.445662 104.026932,27.876556 104.799324,27.635960 
      C104.744331,28.473000 104.427650,28.981535 103.897293,29.726988 
    z"/>
    <path fill="#050505" opacity="0.000000" stroke="none" 
      d="
    M81.939964,62.770264 
      C81.546646,62.972641 81.356445,62.950417 80.881149,62.892963 
      C80.857582,62.424782 81.119110,61.991825 81.717194,61.752762 
      C82.083527,62.146324 82.113297,62.345993 81.939964,62.770264 
    z"/>
    <path fill="#080808" opacity="0.000000" stroke="none" 
      d="
    M58.249413,57.250015 
      C58.417267,57.710541 58.311199,57.956509 57.966721,58.302498 
      C57.625877,58.326797 57.435284,58.213051 57.059395,57.660759 
      C57.060898,56.918320 57.332127,56.752594 57.687775,56.725037 
      C57.813072,56.841183 57.938366,56.957325 58.249413,57.250015 
    z"/>
    <path fill="#ECECEC" opacity="1.000000" stroke="none" 
      d="
    M57.722630,56.383881 
      C57.332127,56.752594 57.060898,56.918320 56.797012,57.455826 
      C52.160580,56.651646 48.202766,52.128754 48.047863,47.891621 
      C47.866554,42.932350 49.114693,37.826622 45.195339,33.349304 
      C44.346134,32.379200 45.445072,28.076647 46.844238,27.182116 
      C48.548344,26.092625 52.129692,26.123011 53.755878,27.278231 
      C55.164963,28.279222 56.182602,32.341312 55.299114,33.647644 
      C49.997814,41.486183 50.674480,48.269230 57.508972,54.644447 
      C57.785748,54.902630 57.683266,55.567390 57.722630,56.383881 
    z"/>
    <path fill="#EDEDED" opacity="1.000000" stroke="none" 
      d="
    M43.282173,60.592407 
      C42.643940,61.220219 42.128014,61.506947 41.337883,61.904694 
      C39.359531,60.644405 37.773823,58.327065 35.926937,58.095837 
      C31.899494,57.591610 29.213356,55.664719 29.703510,51.973003 
      C29.980507,49.886745 32.868809,46.859913 34.902534,46.578133 
      C38.479225,46.082561 40.891171,48.541702 41.038849,52.710812 
      C41.090191,54.160156 42.364647,55.532837 42.879192,57.010616 
      C43.233585,58.028427 43.241638,59.166821 43.282173,60.592407 
    z"/>
    <path fill="#ECECEC" opacity="1.000000" stroke="none" 
      d="
    M90.029343,64.290756 
      C91.227203,60.891674 92.014900,57.508804 93.865723,54.872234 
      C95.141609,53.054680 98.073166,51.073242 99.927910,51.358139 
      C101.812958,51.647697 104.499603,54.569084 104.588799,56.444771 
      C104.674377,58.244278 102.164345,60.570103 100.275177,61.956165 
      C98.036827,63.598419 95.242271,64.482582 92.386459,65.859070 
      C91.413628,65.556976 90.743118,65.091125 90.029343,64.290756 
    z"/>
    <path fill="#E1E1E1" opacity="1.000000" stroke="none" 
      d="
    M81.492828,85.942108 
      C78.153542,85.570000 78.521477,83.486877 79.948952,82.251945 
      C83.146683,79.485558 82.811531,76.041374 82.978165,72.451019 
      C83.044853,71.014107 84.475166,69.640488 85.661789,68.123726 
      C86.671371,68.437569 87.303947,68.865761 87.867264,70.015320 
      C87.525085,73.852509 87.252159,76.968330 86.979233,80.084145 
      C85.261536,82.029541 83.543839,83.974937 81.492828,85.942108 
    z"/>
    <path fill="#040404" opacity="0.000000" stroke="none" 
      d="
    M87.317551,80.004211 
      C87.252159,76.968330 87.525085,73.852509 87.889999,70.329468 
      C89.018867,71.719864 90.055740,73.517487 91.290497,75.656693 
      C90.210869,77.306946 88.933372,78.615616 87.317551,80.004211 
    z"/>
    <path fill="#D8D8D8" opacity="1.000000" stroke="none" 
      d="
    M103.076126,73.917862 
      C102.096779,74.311478 101.112129,74.757744 100.127480,75.204018 
      C99.984016,74.595680 99.840553,73.987350 99.697090,73.379021 
      C100.635567,73.527916 101.574036,73.676819 102.841614,73.880615 
      C103.170715,73.935516 103.070831,73.970505 103.076126,73.917862 
    z"/>
    <path fill="#EEEEEE" opacity="1.000000" stroke="none" 
      d="
    M104.910248,81.566139 
      C104.505859,81.009804 104.371277,80.477516 104.287148,79.937370 
      C104.283974,79.917023 104.770172,79.820465 105.028320,79.759422 
      C105.081757,80.369232 105.135201,80.979034 104.910248,81.566139 
    z"/>
    <path fill="#EEEEEE" opacity="1.000000" stroke="none" 
      d="
    M107.466736,84.452560 
      C107.523956,84.417496 107.409523,84.487633 107.466736,84.452560 
    z"/>
    <path fill="#EDEDED" opacity="01.000000" stroke="none" 
      d="
    M81.941238,37.862694 
      C81.071594,38.065701 80.155624,38.300053 79.398064,38.493877 
      C78.091194,36.228725 76.130699,34.154861 75.764847,31.830055 
      C75.386986,29.428898 75.780350,25.984083 77.302681,24.501396 
      C78.495712,23.339426 83.020309,23.552797 84.087326,24.820076 
      C85.447090,26.435049 85.258682,29.793493 84.890587,32.274723 
      C84.627960,34.045010 82.969948,35.608284 81.881439,37.623909 
      C81.828262,37.983887 81.894920,37.894043 81.941238,37.862694 
    z"/>
    </svg>
  );
};
export const OpenIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 13.5a9.26 9.26 0 0 0-5.61-2.95a1 1 0 0 1-.89-1V1.5A1 1 0 0 1 1.64.51A9.3 9.3 0 0 1 7 3.43zm0 0a9.26 9.26 0 0 1 5.61-2.95a1 1 0 0 0 .89-1V1.5a1 1 0 0 0-1.14-.99A9.3 9.3 0 0 0 7 3.43z"
      />
    </svg>
  );
};
export const PaintingIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 36 36"
    >
      <path
        fill="currentColor"
        d="M32 4H4a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM8.92 8a3 3 0 1 1-3 3a3 3 0 0 1 3-3ZM6 27v-4.1l6-6.08a1 1 0 0 1 1.41 0L16 19.35L8.32 27Zm24 0H11.15l6.23-6.23l5.4-5.4a1 1 0 0 1 1.41 0L30 21.18Z"
      />
      <path fill="none" d="M0 0h36v36H0z" />
    </svg>
  );
};
export const PaintingIconSkeleton = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 12h11a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1" />
        <path d="M9.502 6.212a1.245 1.245 0 1 0 0-2.49a1.245 1.245 0 0 0 0 2.49M9.083 12a7.098 7.098 0 0 0-7.136-5.786A7.6 7.6 0 0 0 .5 6.349" />
        <path d="M13.5 8.94a7.716 7.716 0 0 0-5.506.225" />
      </g>
    </svg>
  );
};
export const QuestionMarkIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
};
export const RobotIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return <FaRobot size={size} className={className} />;
};
export const SwapIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M3.53 11.47v2.118a4.235 4.235 0 0 0 4.235 4.236H20.47M3.53 6.176h12.705a4.235 4.235 0 0 1 4.236 4.236v2.117" />
        <path d="m17.294 14.647l3.177 3.176L17.294 21M6.706 9.353L3.529 6.176L6.706 3" />
      </g>
    </svg>
  );
};
export const TriangleAlertIcon = createIcon(FiAlertTriangle);
export const UsersIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139z"
      />
    </svg>
  );
  // return <FiUser size={size} className={className} />;
};
export const WindowsIcon = ({
  size = 16,
  className = "my-auto flex flex-shrink-0 ",
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        fill="currentColor"
        d="M3 3h8v8H3V3zm10 0h8v8h-8V3zm-10 10h8v8H3v-8zm10 0h8v8h-8v-8z"
      />
    </svg>
  );
};

// ============================================================================
// THIRD-PARTY / COMPANY ICONS (Alphabetically)
// ============================================================================
export const AirtableIcon = createLogoIcon(airtableIcon);
export const AmazonIcon = createLogoIcon(amazonSVG);
export const AnthropicIcon = createLogoIcon(anthropicSVG);
export const AsanaIcon = createLogoIcon(asanaIcon);
export const AxeroIcon = createLogoIcon(axeroImage);
export const AzureIcon = createLogoIcon(azureIcon);
export const BitbucketIcon = createLogoIcon(bitbucketIcon);
export const BookstackIcon = createIcon(SiBookstack);
export const ClickupIcon = createLogoIcon(clickupIcon);
export const CohereIcon = createLogoIcon(cohereIcon);
export const ColorDiscordIcon = createLogoIcon(discordIcon);
export const ColorSlackIcon = createLogoIcon(slackIcon);
export const ConfluenceIcon = createLogoIcon(confluenceSVG, {
  sizeAdjustment: 4,
  classNameAddition: "-m-0.5",
});
export const DeepseekIcon = createLogoIcon(deepseekSVG);
export const DiscourseIcon = createLogoIcon(discourseIcon);
export const Document360Icon = createLogoIcon(document360Icon);
export const DropboxIcon = createLogoIcon(dropboxIcon);
export const EgnyteIcon = createLogoIcon(egnyteIcon);
export const FirefliesIcon = createLogoIcon(firefliesIcon);
export const FreshdeskIcon = createLogoIcon(freshdeskIcon);
export const GeminiIcon = createLogoIcon(geminiSVG);
export const GitbookIcon = createLogoIcon(gitbookDarkIcon, {
  darkSrc: gitbookLightIcon,
});
export const GithubIcon = createLogoIcon(githubLightIcon, {
  monochromatic: true,
});
export const GitlabIcon = createLogoIcon(gitlabIcon);
export const GmailIcon = createLogoIcon(gmailIcon);
export const GongIcon = createLogoIcon(gongIcon);
export const GoogleDriveIcon = createLogoIcon(googleDriveIcon);
export const GoogleIcon = createLogoIcon(googleIcon);
export const GoogleSitesIcon = createLogoIcon(googleSitesIcon);
export const GoogleStorageIcon = createLogoIcon(googleCloudStorageIcon, {
  sizeAdjustment: 4,
  classNameAddition: "-m-0.5",
});
export const GuruIcon = createLogoIcon(guruIcon, { monochromatic: true });
export const HighspotIcon = createLogoIcon(highspotIcon);
export const HubSpotIcon = createLogoIcon(hubSpotIcon);
export const JiraIcon = createLogoIcon(jiraSVG);
export const KimiIcon = createLogoIcon(kimiIcon);
export const LinearIcon = createLogoIcon(linearIcon);
export const LiteLLMIcon = createLogoIcon(litellmIcon);
export const LoopioIcon = createLogoIcon(loopioIcon, { monochromatic: true });
export const MediaWikiIcon = createLogoIcon(mediawikiIcon);
export const MetaIcon = createLogoIcon(metaSVG);
export const MicrosoftIcon = createLogoIcon(microsoftIcon);
export const MicrosoftIconSVG = createLogoIcon(microsoftSVG);
export const MistralIcon = createLogoIcon(mistralSVG);
export const MixedBreadIcon = createLogoIcon(mixedBreadSVG);
export const NomicIcon = createLogoIcon(nomicSVG);
export const NotionIcon = createLogoIcon(notionIcon, { monochromatic: true });
export const OCIStorageIcon = createLogoIcon(OCIStorageSVG);
export const OllamaIcon = createLogoIcon(ollamaIcon);
export const TestRailIcon = createLogoIcon(testrailSVG);
export const OpenAIISVG = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => (
  <svg
    fill="currentColor"
    width={size}
    style={{ width: `${size}px`, height: `${size}px` }}
    height={size}
    className={`w-[${size}px] h-[${size}px] ` + className}
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
    />
  </svg>
);
export const OpenAIIcon = createLogoIcon(openAISVG, { monochromatic: true });
export const OpenAISVG = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
    >
      <path
        fill="currentColor"
        d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"
      />
    </svg>
  );
};
export const OpenSourceIcon = createLogoIcon(openSourceIcon);
export const OutlineIcon = createLogoIcon(outlinePNG, {
  sizeAdjustment: 4,
  classNameAddition: "-m-0.5",
});
export const ProductboardIcon = createLogoIcon(productboardIcon);
export const QwenIcon = createLogoIcon(qwenSVG);
export const R2Icon = createLogoIcon(r2Icon);
export const S3Icon = createLogoIcon(s3Icon);
export const SalesforceIcon = createLogoIcon(salesforceIcon);
export const SharepointIcon = createLogoIcon(sharepointIcon);
export const SlabIcon = createLogoIcon(slabLogoIcon);
export const SlackIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.923 16.52h-2.39a1.984 1.984 0 0 1-1.973-1.195a2.006 2.006 0 0 1 .47-2.263a1.99 1.99 0 0 1 1.502-.53h4.858a1.978 1.978 0 0 1 1.969 1.63a1.951 1.951 0 0 1-1.147 2.173a2.21 2.21 0 0 1-.876.174c-.8.022-1.601.01-2.413.01m-9.435.501v-2.477a2.003 2.003 0 0 1 .56-1.402a1.987 1.987 0 0 1 1.377-.608a1.942 1.942 0 0 1 1.393.522c.377.352.6.84.62 1.357c.043 1.738.043 3.477 0 5.215A1.94 1.94 0 0 1 10.805 21a1.922 1.922 0 0 1-1.423.495a1.954 1.954 0 0 1-1.359-.614a1.97 1.97 0 0 1-.535-1.395c-.01-.815 0-1.64 0-2.466m8.938-9.963v2.434a1.996 1.996 0 0 1-.524 1.5a1.98 1.98 0 0 1-2.242.469a1.981 1.981 0 0 1-1.078-1.165a1.996 1.996 0 0 1-.106-.804V4.46a1.963 1.963 0 0 1 .605-1.386a1.947 1.947 0 0 1 1.408-.537a1.962 1.962 0 0 1 1.383.602a1.979 1.979 0 0 1 .553 1.408c.011.836 0 1.673 0 2.51M6.97 11.511H4.545a1.962 1.962 0 0 1-1.393-.579a1.978 1.978 0 0 1-.427-2.155a1.978 1.978 0 0 1 1.066-1.07a1.97 1.97 0 0 1 .754-.15h4.923a1.962 1.962 0 0 1 1.392.579a1.98 1.98 0 0 1-1.392 3.375zm4.478-6.171v.902c0 .18-.06.261-.216.261H9.165A1.916 1.916 0 0 1 7.9 5.787a1.929 1.929 0 0 1-.4-1.402c.022-.492.227-.958.574-1.306a1.965 1.965 0 0 1 3.342 1.12c.032.38.032.487.032.832v.214zm-5.009 7.204c.06.813.06 1.63 0 2.444a1.902 1.902 0 0 1-.754 1.18a1.887 1.887 0 0 1-1.356.34a1.988 1.988 0 0 1-1.293-.627a2.003 2.003 0 0 1-.536-1.338a1.96 1.96 0 0 1 .497-1.346c.33-.369.786-.599 1.278-.643c.736-.065 1.471-.01 2.164-.01M17.443 11.5V9.329c.052-.509.299-.977.689-1.305c.39-.329.891-.492 1.399-.455c.522 0 1.023.208 1.392.579a1.981 1.981 0 0 1 0 2.796c-.37.371-.87.58-1.392.58c-.671 0-1.363-.022-2.088-.022m-4.967 6.072c.8-.055 1.603-.055 2.402 0c.488.09.92.367 1.208.773c.286.406.405.908.329 1.4a1.99 1.99 0 0 1-.67 1.264a1.98 1.98 0 0 1-1.343.485a1.922 1.922 0 0 1-1.314-.528a1.937 1.937 0 0 1-.6-1.287c-.044-.695-.012-1.401-.012-2.107"
      />
    </svg>
  );
};
export const SlackIconSkeleton = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 14 14"
    >
      <g fill="none" stroke="currentColor">
        <path d="M5.5 2a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0m6 4a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0m-4 6a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0m-6-4a.5.5 0 1 0 1 0a.5.5 0 1 0-1 0" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.793 1.219v4.937m-3.59 1.692v4.937M1.215 5.207h4.937m1.692 3.59h4.937"
        />
      </g>
    </svg>
  );
};
export const TeamsIcon = createLogoIcon(teamsIcon);
export const VoyageIconSVG = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => (
  <svg
    style={{ width: `${size}px`, height: `${size}px` }}
    className={`w-[${size}px] h-[${size}px] ` + className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
  >
    <path
      d="M0 0 C18.56364691 14.8685395 31.52865476 35.60458591 34.68359375 59.39453125 C36.85790415 84.17093249 31.86661083 108.64738046 15.83569336 128.38696289 C-0.18749615 147.32766215 -21.13158775 159.50726579 -46 162 C-70.46026633 163.68595557 -94.53744209 157.16585411 -113.375 141.1875 C-131.5680983 125.12913912 -143.31327081 103.12304227 -145.16845703 78.79052734 C-146.52072106 52.74671426 -138.40787353 29.42123969 -121 10 C-120.39929688 9.30519531 -119.79859375 8.61039063 -119.1796875 7.89453125 C-88.7732111 -25.07872563 -34.66251161 -26.29920259 0 0 Z M-111 6 C-111.96292969 6.76441406 -112.92585938 7.52882813 -113.91796875 8.31640625 C-129.12066 21.0326872 -138.48510826 41.64930525 -141 61 C-142.57102569 86.19086606 -137.40498471 109.10013392 -120.54980469 128.68505859 C-106.05757815 144.84161953 -85.8110604 156.92053779 -63.68798828 158.12597656 C-39.72189393 158.83868932 -17.08757891 154.40601729 1.1875 137.6875 C3.15800523 135.82115685 5.07881363 133.91852176 7 132 C8.22396484 130.7934375 8.22396484 130.7934375 9.47265625 129.5625 C26.2681901 112.046746 31.70691205 89.639394 31.3125 66 C30.4579168 43.32505919 19.07700136 22.58412979 3 7 C-29.27431062 -21.68827611 -78.26536136 -21.67509486 -111 6 Z "
      fill="currentColor"
      transform="translate(155,29)"
    />
    <path
      d="M0 0 C2.62278901 2.33427271 3.96735488 4.64596813 5.4453125 7.81640625 C6.10080078 9.20956055 6.10080078 9.20956055 6.76953125 10.63085938 C7.21683594 11.59830078 7.66414063 12.56574219 8.125 13.5625 C8.58003906 14.53380859 9.03507812 15.50511719 9.50390625 16.50585938 C10.34430119 18.30011504 11.18198346 20.09564546 12.01611328 21.89282227 C12.65935931 23.27045415 13.32005367 24.64010734 14 26 C12.02 26 10.04 26 8 26 C6.515 22.535 6.515 22.535 5 19 C1.7 19 -1.6 19 -5 19 C-5.99 21.31 -6.98 23.62 -8 26 C-9.32 26 -10.64 26 -12 26 C-10.34176227 20.46347949 -7.92776074 15.38439485 -5.4375 10.1875 C-5.02564453 9.31673828 -4.61378906 8.44597656 -4.18945312 7.54882812 C-1.13502139 1.13502139 -1.13502139 1.13502139 0 0 Z M-1 8 C-3.2013866 11.80427492 -3.2013866 11.80427492 -4 16 C-1.69 16 0.62 16 3 16 C2.43260132 11.87026372 2.43260132 11.87026372 1 8 C0.34 8 -0.32 8 -1 8 Z "
      fill="currentColor"
      transform="translate(158,86)"
    />
    <path
      d="M0 0 C2.64453125 1.0234375 2.64453125 1.0234375 4.4453125 4.296875 C4.96971298 5.65633346 5.47294966 7.0241056 5.95703125 8.3984375 C6.22064453 9.08421875 6.48425781 9.77 6.75585938 10.4765625 C7.8687821 13.4482107 8.64453125 15.82826389 8.64453125 19.0234375 C9.30453125 19.0234375 9.96453125 19.0234375 10.64453125 19.0234375 C10.75667969 18.34925781 10.86882813 17.67507812 10.984375 16.98046875 C11.77373626 13.44469078 12.95952974 10.10400184 14.20703125 6.7109375 C14.44099609 6.06576172 14.67496094 5.42058594 14.91601562 4.75585938 C15.48900132 3.17722531 16.06632589 1.60016724 16.64453125 0.0234375 C17.96453125 0.0234375 19.28453125 0.0234375 20.64453125 0.0234375 C20.11164835 5.93359329 17.66052325 10.65458241 15.08203125 15.8984375 C14.65728516 16.77757813 14.23253906 17.65671875 13.79492188 18.5625 C12.75156566 20.71955106 11.70131241 22.87294038 10.64453125 25.0234375 C9.65453125 25.0234375 8.66453125 25.0234375 7.64453125 25.0234375 C6.36851794 22.52596727 5.09866954 20.02565814 3.83203125 17.5234375 C3.29739258 16.47929688 3.29739258 16.47929688 2.75195312 15.4140625 C0.37742917 10.70858383 -1.58321849 5.98797449 -3.35546875 1.0234375 C-2.35546875 0.0234375 -2.35546875 0.0234375 0 0 Z "
      fill="currentColor"
      transform="translate(23.35546875,86.9765625)"
    />
    <path
      d="M0 0 C4.56944444 2.13888889 4.56944444 2.13888889 6 5 C6.58094684 9.76376411 6.98189835 13.6696861 4.0625 17.625 C-0.08290736 19.4862033 -3.52913433 19.80184004 -8 19 C-11.18487773 17.20850628 -12.56721386 16.06753914 -13.9375 12.6875 C-14.04047475 8.25958558 -13.25966827 4.50191217 -10.375 1.0625 C-6.92547207 -0.48070986 -3.67744273 -0.55453501 0 0 Z M-7.66796875 3.21484375 C-9.3387892 5.45403713 -9.40271257 6.72874309 -9.375 9.5 C-9.38273437 10.2734375 -9.39046875 11.046875 -9.3984375 11.84375 C-8.90844456 14.49547648 -8.12507645 15.38331504 -6 17 C-3.17884512 17.42317323 -1.66049093 17.38718434 0.8125 15.9375 C2.65621741 12.92932949 2.30257262 10.44932782 2 7 C1.54910181 4.59436406 1.54910181 4.59436406 0 3 C-4.00690889 1.63330935 -4.00690889 1.63330935 -7.66796875 3.21484375 Z "
      fill="currentColor"
      transform="translate(58,93)"
    />
    <path
      d="M0 0 C0.91007812 0.00902344 1.82015625 0.01804687 2.7578125 0.02734375 C3.45648438 0.03894531 4.15515625 0.05054687 4.875 0.0625 C5.205 1.3825 5.535 2.7025 5.875 4.0625 C4.6375 3.815 3.4 3.5675 2.125 3.3125 C-1.0391959 2.93032359 -1.83705309 2.89394571 -4.6875 4.5625 C-6.71059726 8.08093001 -6.12332701 10.21181009 -5.125 14.0625 C-3.22744856 16.41223818 -3.22744856 16.41223818 0 16.1875 C0.94875 16.14625 1.8975 16.105 2.875 16.0625 C2.875 14.4125 2.875 12.7625 2.875 11.0625 C4.525 11.3925 6.175 11.7225 7.875 12.0625 C8.1875 14.375 8.1875 14.375 7.875 17.0625 C5.25185816 19.29988569 3.33979578 19.9932751 -0.0625 20.5 C-3.96030088 19.9431713 -6.06489651 18.49667323 -9.125 16.0625 C-11.6165904 12.3251144 -11.58293285 10.48918417 -11.125 6.0625 C-7.83836921 1.02299945 -5.86190884 -0.07515268 0 0 Z "
      fill="currentColor"
      transform="translate(113.125,92.9375)"
    />
    <path
      d="M0 0 C4.28705043 1.42901681 5.23208702 4.57025431 7.1875 8.375 C7.55552734 9.06078125 7.92355469 9.7465625 8.30273438 10.453125 C11 15.59744608 11 15.59744608 11 19 C9.35 19 7.7 19 6 19 C5.67 17.68 5.34 16.36 5 15 C2.03 14.67 -0.94 14.34 -4 14 C-4.33 15.65 -4.66 17.3 -5 19 C-5.99 19 -6.98 19 -8 19 C-7.38188466 14.44684052 -5.53234107 10.71540233 -3.4375 6.6875 C-2.9434668 5.71973633 -2.9434668 5.71973633 -2.43945312 4.73242188 C-1.63175745 3.15214772 -0.81662387 1.57567895 0 0 Z M0 6 C-0.33 7.65 -0.66 9.3 -1 11 C0.32 11 1.64 11 3 11 C2.34 9.35 1.68 7.7 1 6 C0.67 6 0.34 6 0 6 Z "
      fill="currentColor"
      transform="translate(90,93)"
    />
    <path
      d="M0 0 C3.63 0 7.26 0 11 0 C11 0.66 11 1.32 11 2 C8.69 2 6.38 2 4 2 C4 3.98 4 5.96 4 8 C5.98 8 7.96 8 10 8 C9.67 8.99 9.34 9.98 9 11 C7.68 11 6.36 11 5 11 C4.67 12.98 4.34 14.96 4 17 C7.465 16.505 7.465 16.505 11 16 C11 16.99 11 17.98 11 19 C7.37 19 3.74 19 0 19 C0 12.73 0 6.46 0 0 Z "
      fill="currentColor"
      transform="translate(124,93)"
    />
    <path
      d="M0 0 C2.25 -0.3125 2.25 -0.3125 5 0 C9 4.10810811 9 4.10810811 9 7 C9.78375 6.21625 10.5675 5.4325 11.375 4.625 C12.91666667 3.08333333 14.45833333 1.54166667 16 0 C16.99 0 17.98 0 19 0 C17.84356383 2.5056117 16.63134741 4.4803655 14.9375 6.6875 C12.52118995 10.81861073 12.20924288 14.29203528 12 19 C10.68 19 9.36 19 8 19 C8.00902344 18.443125 8.01804687 17.88625 8.02734375 17.3125 C7.78294047 11.0217722 5.92390505 8.0388994 1.49609375 3.62890625 C0 2 0 2 0 0 Z "
      fill="currentColor"
      transform="translate(64,93)"
    />
    <path
      d="M0 0 C1.32 0 2.64 0 4 0 C4 8.25 4 16.5 4 25 C2.68 25 1.36 25 0 25 C0 16.75 0 8.5 0 0 Z "
      fill="currentColor"
      transform="translate(173,87)"
    />
    <path
      d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.125 5.75 1.125 5.75 0 8 C1.093125 7.95875 2.18625 7.9175 3.3125 7.875 C7 8 7 8 10 10 C4.555 10.495 4.555 10.495 -1 11 C-1.99 13.31 -2.98 15.62 -4 18 C-5.32 18 -6.64 18 -8 18 C-6.65150163 13.64029169 -4.95092154 9.68658562 -2.875 5.625 C-2.33617187 4.56539063 -1.79734375 3.50578125 -1.2421875 2.4140625 C-0.83226562 1.61742188 -0.42234375 0.82078125 0 0 Z "
      fill="currentColor"
      transform="translate(154,94)"
    />
    <path
      d="M0 0 C0.66 0.33 1.32 0.66 2 1 C2 1.66 2 2.32 2 3 C1.34 3 0.68 3 0 3 C-0.05429959 4.74965358 -0.09292823 6.49979787 -0.125 8.25 C-0.14820313 9.22453125 -0.17140625 10.1990625 -0.1953125 11.203125 C0.00137219 14.0196498 0.55431084 15.60949036 2 18 C1.34 18.33 0.68 18.66 0 19 C-4.69653179 15.74855491 -4.69653179 15.74855491 -5.9375 12.6875 C-6.02161912 9.07037805 -5.30970069 6.36780178 -4 3 C-1.875 1.0625 -1.875 1.0625 0 0 Z "
      fill="currentColor"
      transform="translate(50,93)"
    />
    <path
      d="M0 0 C2.79192205 -0.05380578 5.5828141 -0.09357669 8.375 -0.125 C9.1690625 -0.14175781 9.963125 -0.15851563 10.78125 -0.17578125 C12.85492015 -0.19335473 14.92883241 -0.10335168 17 0 C17.66 0.66 18.32 1.32 19 2 C17 4 17 4 13.0859375 4.1953125 C11.51550649 4.18200376 9.94513779 4.15813602 8.375 4.125 C7.57320312 4.11597656 6.77140625 4.10695312 5.9453125 4.09765625 C3.96341477 4.07406223 1.98167019 4.03819065 0 4 C0 2.68 0 1.36 0 0 Z "
      fill="currentColor"
      transform="translate(92,187)"
    />
    <path
      d="M0 0 C0.99 0.33 1.98 0.66 3 1 C1.66666667 4.33333333 0.33333333 7.66666667 -1 11 C0.65 11 2.3 11 4 11 C4 11.33 4 11.66 4 12 C1.36 12.33 -1.28 12.66 -4 13 C-4.33 14.98 -4.66 16.96 -5 19 C-5.99 19 -6.98 19 -8 19 C-7.38188466 14.44684052 -5.53234107 10.71540233 -3.4375 6.6875 C-2.9434668 5.71973633 -2.9434668 5.71973633 -2.43945312 4.73242188 C-1.63175745 3.15214772 -0.81662387 1.57567895 0 0 Z "
      fill="currentColor"
      transform="translate(90,93)"
    />
    <path
      d="M0 0 C0.99 0 1.98 0 3 0 C2.43454163 3.95820859 1.19097652 6.6659053 -1 10 C-1.66 9.67 -2.32 9.34 -3 9 C-2.44271087 5.65626525 -1.64826111 2.96687001 0 0 Z "
      fill="currentColor"
      transform="translate(37,97)"
    />
    <path
      d="M0 0 C4.92127034 -0.16682272 8.50343896 -0.24828052 13 2 C9.60268371 4.09065618 6.95730595 4.42098999 3 4 C1.125 2.5625 1.125 2.5625 0 1 C0 0.67 0 0.34 0 0 Z "
      fill="currentColor"
      transform="translate(110,12)"
    />
    <path
      d="M0 0 C0 0.99 0 1.98 0 3 C-3.08888522 5.05925681 -3.70935927 5.2390374 -7.1875 5.125 C-9.0746875 5.063125 -9.0746875 5.063125 -11 5 C-10.67 4.34 -10.34 3.68 -10 3 C-7.96875 2.40234375 -7.96875 2.40234375 -5.5 1.9375 C-2.46226779 1.54135157 -2.46226779 1.54135157 0 0 Z "
      fill="currentColor"
      transform="translate(62,107)"
    />
    <path
      d="M0 0 C0.66 0.33 1.32 0.66 2 1 C1.25 5.75 1.25 5.75 -1 8 C-1.66 8 -2.32 8 -3 8 C-1.125 1.125 -1.125 1.125 0 0 Z "
      fill="currentColor"
      transform="translate(154,94)"
    />
    <path
      d="M0 0 C2.64 0 5.28 0 8 0 C8.33 1.32 8.66 2.64 9 4 C6.03 3.01 3.06 2.02 0 1 C0 0.67 0 0.34 0 0 Z "
      fill="currentColor"
      transform="translate(110,93)"
    />
    <path
      d="M0 0 C1.67542976 0.28604898 3.34385343 0.61781233 5 1 C4.67 2.32 4.34 3.64 4 5 C2.0625 4.6875 2.0625 4.6875 0 4 C-0.33 3.01 -0.66 2.02 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z "
      fill="currentColor"
      transform="translate(21,87)"
    />
  </svg>
);
export const WikipediaIcon = createLogoIcon(wikipediaIcon);
export const XenforoIcon = createLogoIcon(xenforoIcon);
export const ZAIIcon = createLogoIcon(zAIIcon);
export const ZendeskIcon = ({
  size = 16,
  className = defaultTailwindCSS,
}: IconProps) => (
  <div
    className="rounded-full overflow-visible dark:overflow-hidden flex items-center justify-center dark:bg-[#fff]/90"
    style={{ width: size, height: size }}
  >
    <LogoIcon
      size={
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? size * 0.8
          : size
      }
      className={`${className}`}
      src={zendeskIcon}
    />
  </div>
);
export const ZulipIcon = createLogoIcon(zulipIcon);

// ============================================================================
// FILE TYPE ICONS (Alphabetically)
// ============================================================================
export const DOCIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-blue-600 w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5,17H14L12,9.5L10,17H8.5L6.1,7H7.8L9.34,14.5L11.3,7H12.7L14.67,14.5L16.2,7H17.9M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const HTMLIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-orange-600 w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2 5 5h-5V4zM8.531 18h-.76v-1.411H6.515V18h-.767v-3.373h.767v1.296h1.257v-1.296h.76V18zm3-2.732h-.921V18h-.766v-2.732h-.905v-.641h2.592v.641zM14.818 18l-.05-1.291c-.017-.405-.03-.896-.03-1.387h-.016c-.104.431-.245.911-.375 1.307l-.41 1.316h-.597l-.359-1.307a15.154 15.154 0 0 1-.306-1.316h-.011c-.021.456-.034.976-.059 1.396L12.545 18h-.705l.216-3.373h1.015l.331 1.126c.104.391.21.811.284 1.206h.017c.095-.391.209-.836.32-1.211l.359-1.121h.996L15.563 18h-.745zm3.434 0h-2.108v-3.373h.767v2.732h1.342V18z"></path>
    </svg>
  );
};
export const ImagesIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-blue-600 w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9 11.5C9 12.3 8.3 13 7.5 13H6.5V15H5V9H7.5C8.3 9 9 9.7 9 10.5V11.5M14 15H12.5L11.5 12.5V15H10V9H11.5L12.5 11.5V9H14V15M19 10.5H16.5V13.5H17.5V12H19V13.7C19 14.4 18.5 15 17.7 15H16.4C15.6 15 15.1 14.3 15.1 13.7V10.4C15 9.7 15.5 9 16.3 9H17.6C18.4 9 18.9 9.7 18.9 10.3V10.5H19M6.5 10.5H7.5V11.5H6.5V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const JSONIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-yellow-500 w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m3.25 8a1.25 1.25 0 1 0-2.5 0v2a1.25 1.25 0 1 0 2.5 0v-2m4.25-1.25a1.25 1.25 0 0 0-1.25 1.25v2a1.25 1.25 0 1 0 2.5 0v-2a1.25 1.25 0 0 0-1.25-1.25m4.25 1.25a1.25 1.25 0 1 0-2.5 0v2a1.25 1.25 0 1 0 2.5 0v-2z"
      />
    </svg>
  );
};
export const PDFIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-red-500 w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3M9.5 11.5C9.5 12.3 8.8 13 8 13H7V15H5.5V9H8C8.8 9 9.5 9.7 9.5 10.5V11.5M14.5 13.5C14.5 14.3 13.8 15 13 15H10.5V9H13C13.8 9 14.5 9.7 14.5 10.5V13.5M18.5 10.5H17V11.5H18.5V13H17V15H15.5V9H18.5V10.5M12 10.5H13V13.5H12V10.5M7 10.5H8V11.5H7V10.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
export const TXTIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-blue-600 w-[${size}px] h-[${size}px] ` + className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.998 14.768H8.895v3.274h-.917v-3.274H6.893V14h3.105v.768zm2.725 3.274-.365-.731c-.15-.282-.246-.492-.359-.726h-.013c-.083.233-.185.443-.312.726l-.335.731h-1.045l1.171-2.045L10.336 14h1.05l.354.738c.121.245.21.443.306.671h.013c.096-.258.174-.438.276-.671l.341-.738h1.043l-1.139 1.973 1.198 2.069h-1.055zm4.384-3.274h-1.104v3.274h-.917v-3.274h-1.085V14h3.105v.768zM14 9h-1V4l5 5h-4z"></path>
    </svg>
  );
};
export const XMLIcon = ({
  size = 24,
  className = defaultTailwindCSS,
}: IconProps) => {
  return (
    <svg
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`text-teal-500 w-[${size}px] h-[${size}px] ` + className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3M8 15H6.5L6 13L5.5 15H4L4.75 12L4 9H5.5L6 11L6.5 9H8L7.25 12L8 15M15.5 15H14V10.5H13V14H11.5V10.5H10.5V15H9V11C9 9.9 9.9 9 11 9H13.5C14.61 9 15.5 9.9 15.5 11V15M20 15H17V9H18.5V13.5H20V15Z"
        fill="currentColor"
      />
    </svg>
  );
};
