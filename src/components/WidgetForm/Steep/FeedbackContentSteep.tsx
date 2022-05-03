import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackTypes, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentSteepProps {
  feedbackType: FeedbackTypes;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentSteep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentSteepProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  function handleSubmitFeedback(e: FormEvent) {
      e.preventDefault()
      console.log({
          screenshot,
          comment
      })
      onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl left-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder:text-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-emerald-700 focus:ring-emerald-700 focus:right-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />
        <footer className="flex md-2 gap-2">
            <ScreenshotButton 
                screenshot={screenshot}
                onScreenshotTook={setScreenshot}
            />
            <button
                type="submit"
                disabled={comment.length === 0}
                className="p-2 bg-emerald-700 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-emerald-700 transition-colors disabled:opacity-50 disabled:hover:bg-emerald-700"
            >
                Enviar Feedback
            </button>
        </footer>
      </form>
    </>
  );
}