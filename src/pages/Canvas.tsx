import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2, Settings, Download, Share, Wand2, Image, Type, Zap, Scissors, Crop, Trash2, Youtube, Instagram, Facebook, Twitter, FileVideo, Monitor, Palette, Film, Music, Layers, Eye, MousePointer, Grid, Sparkles, Mic } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
const Canvas = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMode, setCurrentMode] = useState("text-to-video");
  const [autopilotEnabled, setAutopilotEnabled] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100);
  const [selectedClip, setSelectedClip] = useState(null);
  const [volume, setVolume] = useState(80);
  const [videoClips, setVideoClips] = useState([{
    id: 1,
    start: 0,
    end: 30,
    title: "Scene 1"
  }, {
    id: 2,
    start: 30,
    end: 60,
    title: "Scene 2"
  }, {
    id: 3,
    start: 60,
    end: 100,
    title: "Scene 3"
  }]);

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      numberOfScenes: 3,
      language: "english",
      textModel: "gpt-4o",
      imageModel: "midjourney",
      videoModel: "kling-1.6-standard"
    },
    video: {
      resolution: "1920x1080",
      frameRate: 30,
      aspectRatio: "16:9",
      bitrate: 8000,
      codec: "H.264"
    },
    audio: {
      sampleRate: 48000,
      bitrate: 320,
      channels: "stereo",
      format: "AAC",
      voiceoverEnabled: false,
      selectedVoice: "9BWtsMINqrJLrRacOk9x",
      voiceGender: "all",
      backgroundMusicEnabled: false,
      selectedMusic: "popular-1"
    },
    rendering: {
      quality: "high",
      antiAliasing: true,
      motionBlur: true,
      colorGrading: "cinematic",
      brightness: 50,
      contrast: 50,
      saturation: 50
    },
    effects: {
      particleQuality: "high",
      shadowQuality: "high",
      lightingQuality: "high",
      textureQuality: "high"
    },
    workspace: {
      autoSave: true,
      autoSaveInterval: 5,
      gridSnap: true,
      showGuides: true,
      timelineZoom: 100
    }
  });
  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleExport = (format: string, destination?: string) => {
    console.log(`Exporting as ${format}${destination ? ` to ${destination}` : ''}`);
    // Implementation for actual export functionality would go here
    setExportDialogOpen(false);
  };
  const handleTimelineAction = (action: string, clipId?: number) => {
    switch (action) {
      case 'trim':
        if (selectedClip) {
          const newEnd = currentTime;
          setVideoClips(clips => clips.map(clip => clip.id === selectedClip ? {
            ...clip,
            end: newEnd
          } : clip));
          console.log(`Trimmed clip ${selectedClip} to ${newEnd}s`);
        }
        break;
      case 'crop':
        if (selectedClip) {
          // Implement crop functionality
          console.log(`Cropping clip ${selectedClip}`);
        }
        break;
      case 'delete':
        if (selectedClip || clipId) {
          const idToDelete = selectedClip || clipId;
          setVideoClips(clips => clips.filter(clip => clip.id !== idToDelete));
          setSelectedClip(null);
          console.log(`Deleted clip ${idToDelete}`);
        }
        break;
      case 'split':
        if (selectedClip) {
          const clipToSplit = videoClips.find(clip => clip.id === selectedClip);
          if (clipToSplit && currentTime > clipToSplit.start && currentTime < clipToSplit.end) {
            const newClip = {
              id: Date.now(),
              start: currentTime,
              end: clipToSplit.end,
              title: `${clipToSplit.title} (Split)`
            };
            setVideoClips(clips => clips.map(clip => clip.id === selectedClip ? {
              ...clip,
              end: currentTime
            } : clip).concat(newClip));
            console.log(`Split clip at ${currentTime}s`);
          }
        }
        break;
      case 'duplicate':
        if (selectedClip) {
          const clipToDuplicate = videoClips.find(clip => clip.id === selectedClip);
          if (clipToDuplicate) {
            const newClip = {
              ...clipToDuplicate,
              id: Date.now(),
              start: clipToDuplicate.end,
              end: clipToDuplicate.end + (clipToDuplicate.end - clipToDuplicate.start),
              title: `${clipToDuplicate.title} (Copy)`
            };
            setVideoClips(clips => [...clips, newClip]);
            console.log(`Duplicated clip ${selectedClip}`);
          }
        }
        break;
      default:
        console.log(`Timeline action: ${action}`);
    }
  };
  return <div className="min-h-screen bg-canvas-background">
      <div className="h-screen flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-canvas-toolbar border-b border-border-subtle px-6 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-foreground">Story Canvas</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>Production Settings</DialogTitle>
                  </DialogHeader>
                  <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="general" className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          General
                        </TabsTrigger>
                        <TabsTrigger value="video" className="flex items-center gap-2">
                          <Film className="w-4 h-4" />
                          Video
                        </TabsTrigger>
                        <TabsTrigger value="audio" className="flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          Audio & Voice
                        </TabsTrigger>
                        <TabsTrigger value="rendering" className="flex items-center gap-2">
                          <Palette className="w-4 h-4" />
                          Rendering
                        </TabsTrigger>
                        <TabsTrigger value="effects" className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Effects
                        </TabsTrigger>
                        <TabsTrigger value="workspace" className="flex items-center gap-2">
                          <Grid className="w-4 h-4" />
                          Workspace
                        </TabsTrigger>
                      </TabsList>

                       <TabsContent value="general" className="space-y-6 p-4">
                         {/* Centralized Number of Scenes */}
                         <div className="flex flex-col items-center space-y-2">
                           <Label>Number of Scenes</Label>
                           <div className="flex gap-2">
                             {[1, 2, 3, 4, 5].map(num => (
                               <Button
                                 key={num}
                                 variant={settings.general.numberOfScenes === num ? "default" : "outline"}
                                 size="sm"
                                 onClick={() => setSettings(prev => ({
                                   ...prev,
                                   general: { ...prev.general, numberOfScenes: num }
                                 }))}
                               >
                                 {num}
                               </Button>
                             ))}
                           </div>
                         </div>

                         <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-4">
                             <div>
                               <Label>Language</Label>
                               <Select value={settings.general.language} onValueChange={value => setSettings(prev => ({
                                 ...prev,
                                 general: { ...prev.general, language: value }
                               }))}>
                                 <SelectTrigger>
                                   <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="english">English</SelectItem>
                                   <SelectItem value="spanish">Spanish</SelectItem>
                                   <SelectItem value="french">French</SelectItem>
                                   <SelectItem value="german">German</SelectItem>
                                   <SelectItem value="italian">Italian</SelectItem>
                                   <SelectItem value="portuguese">Portuguese</SelectItem>
                                   <SelectItem value="japanese">Japanese</SelectItem>
                                   <SelectItem value="korean">Korean</SelectItem>
                                   <SelectItem value="chinese">Chinese</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>

                             <div>
                               <Label>Text Model</Label>
                               <Select value={settings.general.textModel} onValueChange={value => setSettings(prev => ({
                                 ...prev,
                                 general: { ...prev.general, textModel: value }
                               }))}>
                                 <SelectTrigger>
                                   <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                                   <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                   <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                                   <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>
                           </div>

                           <div className="space-y-4">
                             <div>
                               <Label>Image Model</Label>
                               <Select value={settings.general.imageModel} onValueChange={value => setSettings(prev => ({
                                 ...prev,
                                 general: { ...prev.general, imageModel: value }
                               }))}>
                                 <SelectTrigger>
                                   <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="midjourney">Midjourney</SelectItem>
                                   <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                                   <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                                   <SelectItem value="flux-dev">Flux Dev</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>

                             <div>
                               <Label>Video Model</Label>
                               <Select value={settings.general.videoModel} onValueChange={value => setSettings(prev => ({
                                 ...prev,
                                 general: { ...prev.general, videoModel: value }
                               }))}>
                                 <SelectTrigger>
                                   <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectItem value="kling-1.6-standard">Kling 1.6 (Standard)</SelectItem>
                                   <SelectItem value="kling-1.6-pro">Kling 1.6 (Pro)</SelectItem>
                                   <SelectItem value="minimax-video">Minimax Video</SelectItem>
                                   <SelectItem value="runway-gen3">Runway Gen-3</SelectItem>
                                   <SelectItem value="pika-labs">Pika Labs</SelectItem>
                                 </SelectContent>
                               </Select>
                             </div>
                           </div>
                         </div>
                      </TabsContent>

                      <TabsContent value="video" className="space-y-6 p-4">
                        <div className="grid grid-cols-2 gap-6">  
                          <div className="space-y-4">
                            <div>
                              <Label>Resolution</Label>
                              <Select value={settings.video.resolution} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                resolution: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                                  <SelectItem value="2560x1440">2560x1440 (2K QHD)</SelectItem>
                                  <SelectItem value="3840x2160">3840x2160 (4K UHD)</SelectItem>
                                  <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label>Frame Rate</Label>
                              <Select value={settings.video.frameRate.toString()} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                frameRate: parseInt(value)
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="24">24 FPS (Cinematic)</SelectItem>
                                  <SelectItem value="30">30 FPS (Standard)</SelectItem>
                                  <SelectItem value="60">60 FPS (Smooth)</SelectItem>
                                  <SelectItem value="120">120 FPS (Ultra Smooth)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Aspect Ratio</Label>
                              <Select value={settings.video.aspectRatio} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                aspectRatio: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="16:9">16:9 (Widescreen)</SelectItem>
                                  <SelectItem value="9:16">9:16 (Vertical/Mobile)</SelectItem>
                                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                                  <SelectItem value="4:3">4:3 (Classic)</SelectItem>
                                  <SelectItem value="21:9">21:9 (Ultra-wide)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>Video Codec</Label>
                              <Select value={settings.video.codec} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                codec: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="H.264">H.264 (Standard)</SelectItem>
                                  <SelectItem value="H.265">H.265/HEVC (Efficient)</SelectItem>
                                  <SelectItem value="VP9">VP9 (Web Optimized)</SelectItem>
                                  <SelectItem value="AV1">AV1 (Next-gen)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Bitrate (kbps): {settings.video.bitrate}</Label>
                              <Slider value={[settings.video.bitrate]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              video: {
                                ...prev.video,
                                bitrate: value
                              }
                            }))} max={50000} min={1000} step={500} className="mt-2" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="audio" className="space-y-6 p-4">
                        <div className="space-y-6">
                          {/* Voiceover Section */}
                          <div className="border-b border-border-subtle pb-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Mic className="w-5 h-5" />
                                Voiceover
                                <Badge variant="secondary" className="ml-2">Powered by ElevenLabs</Badge>
                              </h3>
                              <Switch
                                checked={settings.audio.voiceoverEnabled}
                                onCheckedChange={(checked) => setSettings(prev => ({
                                  ...prev,
                                  audio: { ...prev.audio, voiceoverEnabled: checked }
                                }))}
                              />
                            </div>
                            
                            {settings.audio.voiceoverEnabled && (
                              <div className="space-y-4">
                                <div className="flex gap-2">
                                  <Input placeholder="Search voices..." className="flex-1" />
                                  <Button variant={settings.audio.voiceGender === "female" ? "default" : "outline"} size="sm"
                                    onClick={() => setSettings(prev => ({
                                      ...prev,
                                      audio: { ...prev.audio, voiceGender: "female" }
                                    }))}>
                                    Female
                                  </Button>
                                  <Button variant={settings.audio.voiceGender === "male" ? "default" : "outline"} size="sm"
                                    onClick={() => setSettings(prev => ({
                                      ...prev,
                                      audio: { ...prev.audio, voiceGender: "male" }
                                    }))}>
                                    Male
                                  </Button>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                  {[
                                    { id: "9BWtsMINqrJLrRacOk9x", name: "Aria", gender: "female" },
                                    { id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", gender: "male" },
                                    { id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", gender: "female" },
                                    { id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", gender: "female" },
                                    { id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", gender: "male" },
                                    { id: "JBFqnCBsd6RMkjVDRZzb", name: "George", gender: "male" },
                                    { id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", gender: "male" }
                                  ].filter(voice => settings.audio.voiceGender === "all" || voice.gender === settings.audio.voiceGender)
                                    .map(voice => (
                                    <div key={voice.id} 
                                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                                        settings.audio.selectedVoice === voice.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'
                                      }`}
                                      onClick={() => setSettings(prev => ({
                                        ...prev,
                                        audio: { ...prev.audio, selectedVoice: voice.id }
                                      }))}>
                                      <div className={`w-3 h-3 rounded-full border-2 ${
                                        settings.audio.selectedVoice === voice.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                                      }`} />
                                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                        <Mic className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium">{voice.name}</div>
                                        <div className="text-xs text-muted-foreground">{voice.gender}</div>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Play className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Background Music Section */}
                          <div className="border-b border-border-subtle pb-6">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Music className="w-5 h-5" />
                                Background Music
                                <Badge variant="secondary" className="ml-2">Powered by Suno</Badge>
                              </h3>
                              <Switch
                                checked={settings.audio.backgroundMusicEnabled}
                                onCheckedChange={(checked) => setSettings(prev => ({
                                  ...prev,
                                  audio: { ...prev.audio, backgroundMusicEnabled: checked }
                                }))}
                              />
                            </div>
                            
                            {settings.audio.backgroundMusicEnabled && (
                              <div className="space-y-4">
                                <Input placeholder="Search music..." />
                                
                                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                                  {[
                                    { id: "popular-1", name: "Cinematic Epic", category: "Popular" },
                                    { id: "popular-2", name: "Upbeat Adventure", category: "Popular" },
                                    { id: "popular-3", name: "Emotional Piano", category: "Popular" },
                                    { id: "popular-4", name: "Mystical Ambient", category: "Popular" },
                                    { id: "popular-5", name: "Action Heroic", category: "Popular" }
                                  ].map(music => (
                                    <div key={music.id} 
                                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                                        settings.audio.selectedMusic === music.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted'
                                      }`}
                                      onClick={() => setSettings(prev => ({
                                        ...prev,
                                        audio: { ...prev.audio, selectedMusic: music.id }
                                      }))}>
                                      <div className={`w-3 h-3 rounded-full border-2 ${
                                        settings.audio.selectedMusic === music.id ? 'bg-primary border-primary' : 'border-muted-foreground'
                                      }`} />
                                      <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                        <Music className="w-4 h-4" />
                                      </div>
                                      <div className="flex-1">
                                        <div className="font-medium">{music.name}</div>
                                        <div className="text-xs text-muted-foreground">{music.category}</div>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Play className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Audio Technical Settings */}
                          <div>
                            <h3 className="text-lg font-semibold mb-4">Technical Settings</h3>
                            <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div>
                                  <Label>Sample Rate</Label>
                                  <Select value={settings.audio.sampleRate.toString()} onValueChange={value => setSettings(prev => ({
                                    ...prev,
                                    audio: { ...prev.audio, sampleRate: parseInt(value) }
                                  }))}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="44100">44.1 kHz (CD Quality)</SelectItem>
                                      <SelectItem value="48000">48 kHz (Professional)</SelectItem>
                                      <SelectItem value="96000">96 kHz (High Resolution)</SelectItem>
                                      <SelectItem value="192000">192 kHz (Ultra High)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label>Audio Format</Label>
                                  <Select value={settings.audio.format} onValueChange={value => setSettings(prev => ({
                                    ...prev,
                                    audio: { ...prev.audio, format: value }
                                  }))}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="AAC">AAC (Standard)</SelectItem>
                                      <SelectItem value="MP3">MP3 (Compatible)</SelectItem>
                                      <SelectItem value="FLAC">FLAC (Lossless)</SelectItem>
                                      <SelectItem value="Opus">Opus (Efficient)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label>Channels</Label>
                                  <Select value={settings.audio.channels} onValueChange={value => setSettings(prev => ({
                                    ...prev,
                                    audio: { ...prev.audio, channels: value }
                                  }))}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="mono">Mono</SelectItem>
                                      <SelectItem value="stereo">Stereo</SelectItem>
                                      <SelectItem value="5.1">5.1 Surround</SelectItem>
                                      <SelectItem value="7.1">7.1 Surround</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>

                                <div>
                                  <Label>Audio Bitrate (kbps): {settings.audio.bitrate}</Label>
                                  <Slider value={[settings.audio.bitrate]} onValueChange={([value]) => setSettings(prev => ({
                                    ...prev,
                                    audio: { ...prev.audio, bitrate: value }
                                  }))} max={512} min={64} step={32} className="mt-2" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="rendering" className="space-y-6 p-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Render Quality</Label>
                              <Select value={settings.rendering.quality} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                quality: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="draft">Draft (Fast)</SelectItem>
                                  <SelectItem value="standard">Standard</SelectItem>
                                  <SelectItem value="high">High Quality</SelectItem>
                                  <SelectItem value="production">Production (Slow)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Color Grading</Label>
                              <Select value={settings.rendering.colorGrading} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                colorGrading: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  <SelectItem value="cinematic">Cinematic</SelectItem>
                                  <SelectItem value="vibrant">Vibrant</SelectItem>
                                  <SelectItem value="natural">Natural</SelectItem>
                                  <SelectItem value="dramatic">Dramatic</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch checked={settings.rendering.antiAliasing} onCheckedChange={checked => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                antiAliasing: checked
                              }
                            }))} />
                              <Label>Anti-Aliasing</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch checked={settings.rendering.motionBlur} onCheckedChange={checked => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                motionBlur: checked
                              }
                            }))} />
                              <Label>Motion Blur</Label>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>Brightness: {settings.rendering.brightness}</Label>
                              <Slider value={[settings.rendering.brightness]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                brightness: value
                              }
                            }))} max={100} min={0} step={1} className="mt-2" />
                            </div>

                            <div>
                              <Label>Contrast: {settings.rendering.contrast}</Label>
                              <Slider value={[settings.rendering.contrast]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                contrast: value
                              }
                            }))} max={100} min={0} step={1} className="mt-2" />
                            </div>

                            <div>
                              <Label>Saturation: {settings.rendering.saturation}</Label>
                              <Slider value={[settings.rendering.saturation]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              rendering: {
                                ...prev.rendering,
                                saturation: value
                              }
                            }))} max={100} min={0} step={1} className="mt-2" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="effects" className="space-y-6 p-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <Label>Particle Quality</Label>
                              <Select value={settings.effects.particleQuality} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                particleQuality: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="ultra">Ultra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Shadow Quality</Label>
                              <Select value={settings.effects.shadowQuality} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                shadowQuality: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="ultra">Ultra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>Lighting Quality</Label>
                              <Select value={settings.effects.lightingQuality} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                lightingQuality: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="ultra">Ultra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Texture Quality</Label>
                              <Select value={settings.effects.textureQuality} onValueChange={value => setSettings(prev => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                textureQuality: value
                              }
                            }))}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="ultra">Ultra</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="workspace" className="space-y-6 p-4">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Switch checked={settings.workspace.autoSave} onCheckedChange={checked => setSettings(prev => ({
                              ...prev,
                              workspace: {
                                ...prev.workspace,
                                autoSave: checked
                              }
                            }))} />
                              <Label>Auto Save</Label>
                            </div>

                            <div>
                              <Label>Auto Save Interval (minutes): {settings.workspace.autoSaveInterval}</Label>
                              <Slider value={[settings.workspace.autoSaveInterval]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              workspace: {
                                ...prev.workspace,
                                autoSaveInterval: value
                              }
                            }))} max={30} min={1} step={1} className="mt-2" />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch checked={settings.workspace.gridSnap} onCheckedChange={checked => setSettings(prev => ({
                              ...prev,
                              workspace: {
                                ...prev.workspace,
                                gridSnap: checked
                              }
                            }))} />
                              <Label>Grid Snap</Label>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <Switch checked={settings.workspace.showGuides} onCheckedChange={checked => setSettings(prev => ({
                              ...prev,
                              workspace: {
                                ...prev.workspace,
                                showGuides: checked
                              }
                            }))} />
                              <Label>Show Guides</Label>
                            </div>

                            <div>
                              <Label>Timeline Zoom: {settings.workspace.timelineZoom}%</Label>
                              <Slider value={[settings.workspace.timelineZoom]} onValueChange={([value]) => setSettings(prev => ({
                              ...prev,
                              workspace: {
                                ...prev.workspace,
                                timelineZoom: value
                              }
                            }))} max={500} min={25} step={25} className="mt-2" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-end space-x-2 pt-6 border-t mt-6">
                      <Button variant="outline" onClick={() => setSettingsDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => {
                      console.log('Settings saved:', settings);
                      setSettingsDialogOpen(false);
                    }}>Save Settings</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              
              <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm" className="text-xs px-3 py-1">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Export & Share Video</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6 p-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Video Settings */}
                    <div>
                      <h4 className="text-sm font-medium mb-4 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Video Settings
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-foreground-secondary mb-1 block">Quality</label>
                          <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1 text-sm">
                            <option>HD (1080p)</option>
                            <option>4K (2160p)</option>
                            <option>SD (720p)</option>
                            <option>Standard (480p)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-foreground-secondary mb-1 block">Frame Rate</label>
                          <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1 text-sm">
                            <option>30 FPS</option>
                            <option>60 FPS</option>
                            <option>24 FPS</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-foreground-secondary mb-1 block">Aspect Ratio</label>
                          <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1 text-sm">
                            <option>16:9 (Landscape)</option>
                            <option>9:16 (Portrait)</option>
                            <option>1:1 (Square)</option>
                            <option>4:3 (Classic)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-foreground-secondary mb-1 block">Compression</label>
                          <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1 text-sm">
                            <option>High Quality</option>
                            <option>Balanced</option>
                            <option>Small File Size</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Audio Settings */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Audio Settings
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-foreground-secondary mb-1 block">Audio Quality</label>
                          <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1 text-sm">
                            <option>High (320kbps)</option>
                            <option>Medium (192kbps)</option>
                            <option>Low (128kbps)</option>
                          </select>
                        </div>
                        <div className="flex items-center space-x-2 pt-4">
                          <Switch />
                          <span className="text-xs text-foreground-secondary">Include Subtitles</span>
                        </div>
                      </div>
                    </div>

                    {/* Export Format */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Export Format</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" onClick={() => handleExport('MP4')} className="flex flex-col items-center p-4 h-auto">
                          <FileVideo className="w-6 h-6 mb-1" />
                          <span className="text-xs">MP4</span>
                          <span className="text-xs text-foreground-muted">Most Compatible</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('MOV')} className="flex flex-col items-center p-4 h-auto">
                          <FileVideo className="w-6 h-6 mb-1" />
                          <span className="text-xs">MOV</span>
                          <span className="text-xs text-foreground-muted">Apple Devices</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('GIF')} className="flex flex-col items-center p-4 h-auto">
                          <Image className="w-6 h-6 mb-1" />
                          <span className="text-xs">GIF</span>
                          <span className="text-xs text-foreground-muted">Animation</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('WebM')} className="flex flex-col items-center p-4 h-auto">
                          <Monitor className="w-6 h-6 mb-1" />
                          <span className="text-xs">WebM</span>
                          <span className="text-xs text-foreground-muted">Web Optimized</span>
                        </Button>
                      </div>
                    </div>
                    
                    {/* Direct Share */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Share to Social Media</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <Button variant="outline" onClick={() => handleExport('MP4', 'YouTube')} className="flex flex-col items-center p-4 h-auto">
                          <Youtube className="w-6 h-6 mb-1 text-red-500" />
                          <span className="text-xs">YouTube</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('MP4', 'Instagram')} className="flex flex-col items-center p-4 h-auto">
                          <Instagram className="w-6 h-6 mb-1 text-pink-500" />
                          <span className="text-xs">Instagram</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('MP4', 'Facebook')} className="flex flex-col items-center p-4 h-auto">
                          <Facebook className="w-6 h-6 mb-1 text-blue-500" />
                          <span className="text-xs">Facebook</span>
                        </Button>
                        <Button variant="outline" onClick={() => handleExport('MP4', 'Twitter')} className="flex flex-col items-center p-4 h-auto">
                          <Twitter className="w-6 h-6 mb-1 text-blue-400" />
                          <span className="text-xs">Twitter</span>
                        </Button>
                      </div>
                    </div>

                    {/* Advanced Options */}
                    <div>
                      <h4 className="text-sm font-medium mb-3">Advanced Options</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground-secondary">Add Watermark</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground-secondary">Include Analytics Tracking</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-foreground-secondary">Auto-generate Thumbnail</span>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setExportDialogOpen(false)}>Cancel</Button>
                      <Button onClick={() => handleExport('MP4')} className="bg-primary">Export Video</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Controls */}
          <div className="w-84 bg-canvas-panel border-r border-border-subtle p-3 overflow-y-auto custom-scrollbar">
            <Tabs value={currentMode} onValueChange={setCurrentMode} className="w-full">
              <TabsList className="bg-canvas-toolbar mb-6">
                <TabsTrigger value="text-to-video" className="flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Text-to-Video</span>
                </TabsTrigger>
                <TabsTrigger value="image-to-video" className="flex items-center space-x-2">
                  <Image className="w-4 h-4" />
                  <span>Image-to-Video</span>
                </TabsTrigger>
              </TabsList>

              {/* Autopilot Switch */}
              <div className="mb-6 p-4 bg-canvas-toolbar rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">Autopilot Mode</span>
                  </div>
                  <Switch checked={autopilotEnabled} onCheckedChange={setAutopilotEnabled} />
                </div>
                <p className="text-xs text-foreground-muted mt-2">
                  AI handles everything automatically
                </p>
              </div>

              <TabsContent value="text-to-video" className="space-y-6 mt-0">
                <div>
                  <Textarea placeholder="Describe your story idea... AI will generate characters, scenes, and dialogue automatically." className="min-h-32 bg-background-secondary border-border text-foreground" />
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Style Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-foreground-secondary mb-1 block">Animation Style</label>
                      <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1.5 text-sm text-foreground">
                        <option>Pixar Style</option>
                        <option>Anime</option>
                        <option>Realistic</option>
                        <option>Cartoon</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-foreground-secondary mb-1 block">Duration</label>
                      <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1.5 text-sm text-foreground">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image-to-video" className="space-y-6 mt-0">
                <div>
                  <Card className="border-2 border-dashed border-border-subtle p-6 text-center cursor-pointer hover:border-accent transition-colors">
                    <Image className="w-10 h-10 text-foreground-muted mx-auto mb-2" />
                    <p className="text-sm text-foreground-secondary">Drop images here or click to upload</p>
                  </Card>
                </div>
                
                <div>
                  <label className="text-sm text-foreground-secondary mb-2 block">Motion Description</label>
                  <Textarea placeholder="Describe how you want the images to animate..." className="min-h-24 bg-background-secondary border-border text-foreground" />
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Style Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-foreground-secondary mb-1 block">Animation Style</label>
                      <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1.5 text-sm text-foreground">
                        <option>Pixar Style</option>
                        <option>Anime</option>
                        <option>Realistic</option>
                        <option>Cartoon</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-foreground-secondary mb-1 block">Duration</label>
                      <select className="w-full bg-background-secondary border border-border rounded-md px-2 py-1.5 text-sm text-foreground">
                        <option>30 seconds</option>
                        <option>1 minute</option>
                        <option>2 minutes</option>
                        <option>5 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Generate Button */}
            <div className="mt-8">
              <Button size="lg" className="w-full hover-glow">
                <Wand2 className="w-5 h-5 mr-2" />
                Generate Story
              </Button>
            </div>

          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Preview Area */}
            <div className="flex-1 bg-background flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl aspect-video bg-background-secondary border-border-subtle flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Ready to Create</h3>
                  <p className="text-foreground-secondary">Your generated story will appear here</p>
                </div>
              </Card>
            </div>

            {/* Timeline/Controls */}
            <div className="bg-canvas-panel border-t border-border-subtle p-4 h-48">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button variant="default" size="sm" onClick={togglePlay} className="w-8 h-8 rounded-full">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setCurrentTime(Math.min(duration, currentTime + 10))}>
                    <SkipForward className="w-4 h-4" />
                  </Button>
                  
                  {/* Timeline Edit Controls */}
                  <div className="flex items-center space-x-2 ml-6 border-l border-border-subtle pl-4">
                    <Button variant={selectedClip ? "default" : "ghost"} size="sm" onClick={() => handleTimelineAction('trim')} disabled={!selectedClip} title="Trim selected clip to current time">
                      <Scissors className="w-4 h-4" />
                    </Button>
                    <Button variant={selectedClip ? "default" : "ghost"} size="sm" onClick={() => handleTimelineAction('crop')} disabled={!selectedClip} title="Crop selected clip">
                      <Crop className="w-4 h-4" />
                    </Button>
                    <Button variant={selectedClip ? "default" : "ghost"} size="sm" onClick={() => handleTimelineAction('split')} disabled={!selectedClip} title="Split clip at current time">
                      <Zap className="w-4 h-4" />
                    </Button>
                    <Button variant={selectedClip ? "destructive" : "ghost"} size="sm" onClick={() => handleTimelineAction('delete')} disabled={!selectedClip} title="Delete selected clip">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-foreground-secondary">
                    {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, '0')} / {Math.floor(duration / 60)}:{(duration % 60).toFixed(0).padStart(2, '0')}
                  </span>
                  <Volume2 className="w-4 h-4 text-foreground-secondary" />
                  <div className="w-24">
                    <Slider
                      value={[volume]}
                      onValueChange={([value]) => setVolume(value)}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              {/* Timeline Track */}
              <div className="bg-background-secondary rounded-lg p-3 flex-1 relative -mt-2">
                <div className="flex items-center h-16 relative">
                  {/* Timeline ruler */}
                  <div className="absolute top-0 left-0 right-0 h-4 flex justify-between text-xs text-foreground-muted">
                    {Array.from({
                    length: Math.ceil(duration / 10) + 1
                  }, (_, i) => <span key={i}>{i * 10}s</span>)}
                  </div>
                  
                  {/* Video clips */}
                  <div className="relative w-full h-8 mt-4 bg-background rounded">
                    {videoClips.map(clip => <div key={clip.id} className={`absolute h-8 rounded cursor-pointer transition-all ${selectedClip === clip.id ? 'bg-primary border-2 border-primary-foreground' : 'bg-accent hover:bg-accent-foreground'}`} style={{
                    left: `${clip.start / duration * 100}%`,
                    width: `${(clip.end - clip.start) / duration * 100}%`
                  }} onClick={() => setSelectedClip(selectedClip === clip.id ? null : clip.id)}>
                        <div className="p-1 text-xs text-foreground truncate">
                          {clip.title}
                        </div>
                      </div>)}
                    
                    {/* Playhead */}
                    <div className="absolute top-0 w-0.5 h-8 bg-red-500 pointer-events-none z-10" style={{
                    left: `${currentTime / duration * 100}%`
                  }} />
                  </div>
                </div>
                
                {/* Timeline scrubber */}
                <div className="mt-2">
                  <input type="range" min="0" max={duration} value={currentTime} onChange={e => setCurrentTime(Number(e.target.value))} className="w-full h-1 bg-background-secondary rounded-lg appearance-none cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Canvas;