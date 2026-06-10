import type { SVGProps } from "react";
import casaTier3Svg from "./casa-tier-3-badge.svg?raw";
import ccpaSvg from "./ccpa-badge.svg?raw";
import gdprSvg from "./gdpr-badge.svg?raw";
import soc2Svg from "./soc2-badge.svg?raw";

function svgInner(raw: string) {
  return raw.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
}

function createComplianceBadge(innerHtml: string) {
  return function ComplianceBadge({
    className,
    "aria-label": ariaLabel,
    ...props
  }: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={ariaLabel}
        {...props}
        dangerouslySetInnerHTML={{ __html: innerHtml }}
      />
    );
  };
}

export const CasaTier3Badge = createComplianceBadge(svgInner(casaTier3Svg));
export const GdprBadge = createComplianceBadge(svgInner(gdprSvg));
export const CcpaBadge = createComplianceBadge(svgInner(ccpaSvg));
export const Soc2Badge = createComplianceBadge(svgInner(soc2Svg));
