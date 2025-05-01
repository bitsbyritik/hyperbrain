"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/ai/assistant-ui/thread";
import { ThreadList } from "@/components/ai/assistant-ui/thread-list";
import { SelectCollection } from "../create/select-collection";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  const onSelectAction = () => {};

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="grid h-[calc(100dvh-48px)] grid-cols-1 md:grid-cols-[276px_1fr]">
        <div className="hidden md:flex flex-col gap-4 border-r bg-card pt-4 px-2">
          <SelectCollection onSelectAction={onSelectAction} />
          <ThreadList />
        </div>
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
};
