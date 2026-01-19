"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whyIBuildContent } from "@/content/personal";

interface WhyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhyDrawer({ isOpen, onClose }: WhyDrawerProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>

            {/* Drawer Content */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[var(--surface-primary)] z-50 shadow-2xl overflow-hidden flex flex-col border-l-4 border-[var(--red-accent)]"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
                  <Dialog.Title className="text-2xl font-bold text-[var(--text-primary)]">
                    {whyIBuildContent.title}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red-accent)]"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-lg text-[var(--text-secondary)] mb-8 italic">
                    {whyIBuildContent.subtitle}
                  </p>

                  <div className="space-y-8">
                    {whyIBuildContent.sections.map((section, index) => (
                      <motion.div
                        key={section.heading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <h3 className="text-lg font-semibold text-[var(--red-accent)] mb-3">
                          {section.heading}
                        </h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                          {section.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Closing thought */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 pt-6 border-t border-[var(--border-color)]"
                  >
                    <p className="text-[var(--text-primary)] font-medium italic text-center">
                      &ldquo;{whyIBuildContent.closingThought}&rdquo;
                    </p>
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[var(--border-color)] bg-[var(--surface-secondary)]">
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Work
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
