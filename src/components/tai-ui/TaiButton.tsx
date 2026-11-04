"use client";

import React, { useState, type ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { TAI_EASE, TAI_PHYSICS } from "@/lib/motion";

/* =========================================================================
   Subcomponent: ArrowRoll
   Kinetic forward-rolling arrow with physics-calibrated transition.
   ========================================================================= */
export interface ArrowRollProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ArrowRoll({ className = "", size = "md" }: Readonly<ArrowRollProps>) {
  const sizeClasses = {
    sm: "w-4.5 h-4.5 text-[11px]",
    md: "w-6 h-6 text-xs",
    lg: "w-8 h-8 sm:w-9 sm:h-9 text-sm sm:text-base",
  }[size];

  return (
    <span
      className={`tai-arrow-roll relative overflow-hidden rounded-[var(--tai-radius-sm)] bg-black text-white group-hover:bg-white group-hover:text-black inline-flex items-center justify-center font-extrabold shrink-0 transition-colors duration-300 select-none leading-none ${sizeClasses} ${className}`}
    >
      <span className="inline-flex items-center justify-center leading-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[160%] group-hover:-translate-y-[160%]">
        ↗
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center leading-none -translate-x-[160%] translate-y-[160%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0"
      >
        ↗
      </span>
    </span>
  );
}

/* =========================================================================
   Subcomponent: ButtonTextRoll
   Dual-layer micro-tumbler rolling text for buttons and kinetic labels.
   ========================================================================= */
export interface ButtonTextRollProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function ButtonTextRoll({
  text,
  className = "",
  stagger = 0,
}: Readonly<ButtonTextRollProps>) {
  if (stagger === 0) {
    return (
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden h-[1.12em] leading-none select-none",
          className
        )}
      >
        <span className="inline-flex items-center justify-center leading-none transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[135%]">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center leading-none translate-y-[135%] transform transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
        >
          {text}
        </span>
      </span>
    );
  }

  const letterNodes = Array.from(text).map((char, index) => ({
    id: `btn-char-${index}`,
    char: char === " " ? "\u00A0" : char,
    delay: index * stagger,
  }));
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden h-[1.12em] leading-none select-none",
        className
      )}
    >
      <span className="inline-flex items-center leading-none">
        {letterNodes.map((item) => (
          <span
            key={item.id}
            style={{ transitionDelay: `${item.delay}ms` }}
            className="inline-block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[135%]"
          >
            {item.char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center leading-none translate-y-[135%]"
      >
        {letterNodes.map((item) => (
          <span
            key={item.id}
            style={{ transitionDelay: `${item.delay}ms` }}
            className="inline-block transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          >
            {item.char}
          </span>
        ))}
      </span>
    </span>
  );
}

/* =========================================================================
   Subcomponent: TextRoll
   Tumbler slot-machine roll for headings, metrics, and callouts.
   ========================================================================= */
export interface TextRollProps {
  text: string;
  className?: string;
  as?: ElementType;
  stagger?: number;
  duration?: number;
}

export function TextRoll({
  text,
  className = "",
  as: Component = "span",
  stagger = 0.02,
  duration = 0.85,
}: Readonly<TextRollProps>) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <Component className={cn("inline-flex whitespace-pre", className)}>
        {text}
      </Component>
    );
  }

  const letterNodes = Array.from(text).map((char, index) => ({
    id: `roll-char-${index}`,
    char: char === " " ? "\u00A0" : char,
    delay: index * (stagger * 1000),
  }));
  return (
    <Component className={cn("relative inline-flex overflow-hidden leading-none select-none group", className)}>
      <span className="inline-flex">
        {letterNodes.map((item) => (
          <span
            key={item.id}
            style={{ transitionDelay: `${item.delay}ms`, transitionDuration: `${duration}s` }}
            className="inline-block transform transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[135%]"
          >
            {item.char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 flex translate-y-[135%]"
      >
        {letterNodes.map((item) => (
          <span
            key={item.id}
            style={{ transitionDelay: `${item.delay}ms`, transitionDuration: `${duration}s` }}
            className="inline-block transform transition-transform ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
          >
            {item.char}
          </span>
        ))}
      </span>
    </Component>
  );
}

/* =========================================================================
   Subcomponent: WipeButton
   Horizontal forward-wipe interactive button fill.
   ========================================================================= */
export interface WipeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  as?: "button" | "a" | "div";
  href?: string;
  target?: string;
  rel?: string;
  wipeColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  ariaLabel?: string;
}

export const WipeButton = React.forwardRef<HTMLButtonElement, WipeButtonProps>(
  (
    {
      children,
      className,
      asChild = false,
      onClick,
      href,
      target,
      rel,
      wipeColor = "var(--tai-text)",
      textColor,
      hoverTextColor = "var(--tai-bg)",
      borderColor = "var(--tai-border)",
      hoverBorderColor = "var(--tai-border-strong)",
      ariaLabel,
      ...props
    },
    ref
  ) => {
    const [wipeState, setWipeState] = useState<"idle" | "in" | "out">("idle");
    const prefersReduced = useReducedMotion();

    if (asChild) {
      return (
        <Slot
          className={cn(
            "relative inline-flex items-center justify-center overflow-hidden rounded-[var(--tai-radius-md)] cursor-pointer select-none",
            className
          )}
          ref={ref as unknown as React.Ref<HTMLElement>}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    let wipeX = "-102%";
    if (wipeState === "in") {
      wipeX = "0%";
    } else if (wipeState === "out") {
      wipeX = "102%";
    }

    const innerContent = (
      <>
        {!prefersReduced && (
          <motion.div
            initial={{ x: "-102%" }}
            animate={{ x: wipeX }}
            transition={{
              duration: 0.42,
              ease: TAI_EASE.luxury,
            }}
            onAnimationComplete={() => {
              if (wipeState === "out") {
                setWipeState("idle");
              }
            }}
            className="absolute inset-0 pointer-events-none rounded-[var(--tai-radius-md)]"
            style={{ backgroundColor: wipeColor, zIndex: 0 }}
          />
        )}
        <span
          className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-200"
          style={{
            color: wipeState === "in" ? hoverTextColor : textColor,
          }}
        >
          {children}
        </span>
      </>
    );

    const baseClasses = cn(
      "relative inline-flex items-center justify-center overflow-hidden rounded-[var(--tai-radius-md)] font-mono text-xs tracking-wider uppercase transition-[border-color,transform] duration-300 cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-tai-focus active:scale-[0.98] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
      className
    );

    const sharedStyles: React.CSSProperties = {
      borderColor: wipeState === "in" ? hoverBorderColor : borderColor,
    };

    if (props.as === "div") {
      return (
        <div
          ref={ref as unknown as React.Ref<HTMLDivElement>}
          onMouseEnter={() => setWipeState("in")}
          onMouseLeave={() => setWipeState("out")}
          className={baseClasses}
          style={sharedStyles}
          {...(props as unknown as React.HTMLAttributes<HTMLDivElement>)}
        >
          {innerContent}
        </div>
      );
    }

    if (href) {
      return (
        <a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseEnter={() => setWipeState("in")}
          onMouseLeave={() => setWipeState("out")}
          className={baseClasses}
          style={sharedStyles}
          aria-label={ariaLabel}
          {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        onMouseEnter={() => setWipeState("in")}
        onMouseLeave={() => setWipeState("out")}
        className={baseClasses}
        style={sharedStyles}
        aria-label={ariaLabel}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);
WipeButton.displayName = "WipeButton";

/* =========================================================================
   Primary Component: TaiButton
   With variants for primary, secondary, outline, ghost, and wipe.
   ========================================================================= */
export const taiButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[var(--tai-radius-md)] font-mono text-xs tracking-wider uppercase transition-colors duration-400 group cursor-pointer select-none outline-none focus-visible:ring-1 focus-visible:ring-tai-focus",
  {
    variants: {
      variant: {
        primary:
          "bg-tai-text text-tai-bg hover:bg-tai-muted font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_1px_2px_0_rgba(0,0,0,0.4)]",
        secondary:
          "bg-tai-card text-tai-text hover:bg-tai-surface border border-tai-border hover:border-tai-border-strong font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]",
        outline:
          "bg-transparent text-tai-text border border-tai-border hover:border-tai-border-strong hover:bg-tai-surface font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
        ghost:
          "bg-transparent text-tai-muted hover:text-tai-text hover:bg-tai-surface font-medium",
        wipe:
          "bg-transparent text-tai-text border border-tai-border hover:border-tai-border-strong font-medium",
      },
      size: {
        default: "px-5 py-2.5",
        sm: "px-3 py-1.5 text-[11px]",
        lg: "px-7 py-3.5 text-sm",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface TaiButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof taiButtonVariants> {
  asChild?: boolean;
  href?: string;
  icon?: React.ReactNode;
  rollText?: boolean;
  arrowRoll?: boolean | "sm" | "md" | "lg";
  wipeColor?: string;
}

const bgInitial = { opacity: 0, scale: 1.02 };
const bgVariants = {
  hover: { opacity: 1, scale: 1 },
  idle: { opacity: 0, scale: 1.02 },
};
const contentVariants = {
  hover: { y: 0 },
  idle: { y: 0 },
};
const iconVariants = {
  hover: { x: 1 },
  idle: { x: 0 },
};
const tapAnimation = { scale: 0.97 };

export const TaiButton = React.forwardRef<HTMLButtonElement, TaiButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      href,
      icon,
      rollText = false,
      arrowRoll = false,
      wipeColor = "var(--tai-text)",
      children,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion();

    if (asChild) {
      return (
        <Slot
          className={cn(taiButtonVariants({ variant, size, className }))}
          ref={ref as unknown as React.Ref<HTMLElement>}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    if (variant === "wipe") {
      return (
        <WipeButton
          ref={ref}
          href={href}
          wipeColor={wipeColor}
          className={cn(taiButtonVariants({ variant, size, className }))}
          {...(props as unknown as WipeButtonProps)}
        >
          {typeof children === "string" && rollText ? (
            <ButtonTextRoll text={children} />
          ) : (
            children
          )}
          {arrowRoll && (
            <ArrowRoll size={typeof arrowRoll === "string" ? arrowRoll : "sm"} />
          )}
          {icon}
        </WipeButton>
      );
    }

    const sharedInner = (
      <>
        {variant !== "ghost" && (
          <motion.div
            className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none"
            initial={bgInitial}
            variants={bgVariants}
            transition={{
              duration: prefersReduced ? 0 : 0.45,
              ease: TAI_EASE.luxury,
            }}
          />
        )}
        <motion.span
          className="relative flex items-center justify-center gap-2"
          variants={contentVariants}
          transition={prefersReduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 22 }}
        >
          {typeof children === "string" && rollText ? (
            <ButtonTextRoll text={children} />
          ) : (
            <span>{children}</span>
          )}

          {arrowRoll && (
            <ArrowRoll size={typeof arrowRoll === "string" ? arrowRoll : "sm"} />
          )}

          {icon && (
            <motion.span
              variants={iconVariants}
              transition={{
                duration: prefersReduced ? 0 : 0.35,
                ease: TAI_EASE.luxury,
              }}
              className="flex items-center justify-center shrink-0"
            >
              {icon}
            </motion.span>
          )}
        </motion.span>
      </>
    );

    if (href) {
      return (
        <motion.a
          ref={ref as unknown as React.Ref<HTMLAnchorElement>}
          href={href}
          className={cn(taiButtonVariants({ variant, size, className }))}
          whileHover="hover"
          variants={{ hover: prefersReduced ? { y: 0 } : { y: -0.5 } }}
          whileTap={tapAnimation}
          transition={TAI_PHYSICS.microswitch}
          {...(props as unknown as Record<string, unknown>)}
        >
          {sharedInner}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={cn(taiButtonVariants({ variant, size, className }))}
        whileHover="hover"
        variants={{ hover: prefersReduced ? { y: 0 } : { y: -0.5 } }}
        whileTap={tapAnimation}
        transition={TAI_PHYSICS.microswitch}
        {...(props as unknown as Record<string, unknown>)}
      >
        {sharedInner}
      </motion.button>
    );
  }
);

TaiButton.displayName = "TaiButton";
