import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Shield, Feather } from "lucide-react"
import { ClassicalDivider } from "@/components/classical-divider"

export default function Home() {
  return (
    <div className="min-h-screen bg-parchment-50 dark:bg-marble-900">
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="p-4 border-2 border-terracotta-800 dark:border-terracotta-600 rounded-full">
                  <BookOpen className="h-10 w-10 text-terracotta-800 dark:text-terracotta-600" />
                </div>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-terracotta-900 dark:text-terracotta-500">
              Books 46
            </h1>

            {/* Ornamental divider */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-px bg-terracotta-800 dark:bg-terracotta-600"></div>
              <div className="mx-4 text-terracotta-800 dark:text-terracotta-600">✦</div>
              <div className="w-16 h-px bg-terracotta-800 dark:bg-terracotta-600"></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-marble-800 dark:text-marble-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              A sanctuary for the written word, where knowledge of ages past is preserved with dignity and grace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link href="/login">
                <Button className="classical-button px-8 py-6 text-lg">Enter the Archives</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="classical-button-outline px-8 py-6 text-lg">
                  Request Membership
                </Button>
              </Link>
            </div>

            <ClassicalDivider text="VIRTUS ET SAPIENTIA" />

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              <div className="classical-card p-8 border">
                <div className="mb-6 flex justify-center">
                  <Shield className="h-8 w-8 text-terracotta-800 dark:text-terracotta-600" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-marble-900 dark:text-marble-100">Preservation</h3>
                <p className="text-marble-700 dark:text-marble-300 font-light">
                  Your collection is preserved with the same care as the ancient libraries of Rome.
                </p>
              </div>

              <div className="classical-card p-8 border">
                <div className="mb-6 flex justify-center">
                  <BookOpen className="h-8 w-8 text-terracotta-800 dark:text-terracotta-600" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-marble-900 dark:text-marble-100">Curation</h3>
                <p className="text-marble-700 dark:text-marble-300 font-light">
                  Organize your literary treasures with the precision of a master archivist.
                </p>
              </div>

              <div className="classical-card p-8 border">
                <div className="mb-6 flex justify-center">
                  <Feather className="h-8 w-8 text-terracotta-800 dark:text-terracotta-600" />
                </div>
                <h3 className="text-xl font-serif mb-3 text-marble-900 dark:text-marble-100">Legacy</h3>
                <p className="text-marble-700 dark:text-marble-300 font-light">
                  Create a literary legacy that stands the test of time, as the classics have done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
