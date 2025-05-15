import { useState, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdCode, MdOutlineTextFields } from "react-icons/md";

interface Props {
  isOpen: boolean;
  state: {
    nodePosition: {
      x: number;
      y: number;
    };
  };
}

export const DiagramContextMenu = ({ isOpen, state }: Props) => {
  const [languageOpen, setLanguageOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTriggerEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setLanguageOpen(true);
  };

  const handleTriggerLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setLanguageOpen(false);
    }, 200); // Задержка, чтобы дать время курсору перейти в подменю
  };

  const handleSubContentEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleSubContentLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setLanguageOpen(false);
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <DropdownMenu.Root open>
      <DropdownMenu.Content
        sideOffset={5}
        align="start"
        style={{
          position: "fixed",
          top: state.nodePosition.y,
          left: state.nodePosition.x,
          zIndex: 1000,
          minWidth: 180,
          background: "white",
          border: "1px solid #ccc",
          borderRadius: 4,
          padding: 8,
        }}
      >
        <DropdownMenu.Item>
          <MdOutlineTextFields size={15} style={{ marginRight: 8 }} />
          Text Node
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <MdCode size={15} style={{ marginRight: 8 }} />
          Code Node
        </DropdownMenu.Item>

        {/* Подменю Language */}
        <DropdownMenu.Sub open={languageOpen} onOpenChange={setLanguageOpen}>
          <DropdownMenu.SubTrigger
            onPointerEnter={handleTriggerEnter}
            onPointerLeave={handleTriggerLeave}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "4px 8px",
            }}
          >
            Language
            <span style={{ marginLeft: "auto" }}>▶</span>
          </DropdownMenu.SubTrigger>

          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              sideOffset={5}
              alignOffset={-4}
              onPointerEnter={handleSubContentEnter}
              onPointerLeave={handleSubContentLeave}
              style={{
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: 8,
              }}
            >
              <DropdownMenu.Item>JavaScript</DropdownMenu.Item>
              <DropdownMenu.Item>Python</DropdownMenu.Item>
              <DropdownMenu.Item>Rust</DropdownMenu.Item>
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
