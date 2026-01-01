import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link2, BarChart3, Zap, Shield, Globe, MousePointerClick } from 'lucide-react';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <Badge variant="secondary" className="text-sm">
            <Zap className="mr-1 h-3 w-3" />
            Fast, Simple & Powerful
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Shorten Links.
            <br />
            <span className="text-primary">Track Performance.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Transform long, unwieldy URLs into short, shareable links. 
            Monitor clicks, analyze traffic, and optimize your online presence—all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <SignUpButton mode="modal">
              <Button size="lg" className="text-base px-8">
                Get Started Free
              </Button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to manage your links
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to help you create, manage, and track your shortened links effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <Link2 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Instant URL Shortening</CardTitle>
              <CardDescription>
                Create short, memorable links in seconds. Perfect for social media, emails, and marketing campaigns.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Analytics & Insights</CardTitle>
              <CardDescription>
                Track clicks, monitor performance, and gain valuable insights into your audience engagement.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Built with modern technology for instant redirects and real-time analytics updates.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Secure & Reliable</CardTitle>
              <CardDescription>
                Your links are protected with enterprise-grade security and reliable uptime.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Custom Short Codes</CardTitle>
              <CardDescription>
                Create branded, memorable short links that reflect your business or personal brand.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <MousePointerClick className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>
                Intuitive dashboard and streamlined workflow make link management effortless for everyone.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <Card className="bg-primary text-primary-foreground border-0 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to shorten your first link?
              </h2>
              <p className="text-lg opacity-90 max-w-2xl mx-auto">
                Join users who trust our platform for their link management needs.
                Get started today—it's free!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <SignUpButton mode="modal">
                  <Button size="lg" variant="secondary" className="text-base px-8">
                    Create Free Account
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Link Shortener. Built with Next.js and Clerk.</p>
        </div>
      </footer>
    </div>
  );
}
